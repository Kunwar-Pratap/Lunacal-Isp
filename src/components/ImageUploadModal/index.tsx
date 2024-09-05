"use client";

import { Button } from "@nextui-org/button";
import { Input, Textarea } from "@nextui-org/input";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/modal";
import { Progress } from "@nextui-org/progress";
import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import React, { ChangeEvent, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { v4 as uuidv4 } from "uuid";

// import SinglePortfolioHeader from "./single-portfolio-header";

import { db, storage } from "@/utils/firebase";
import { validateImage } from "@/lib/validations";


interface Errors {

  image?: string;
}

const BugReportFormModal = ({ isOpen, onClose }: any) => {
  const [image, setImage] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const [messageTimeout, setMessageTimeout] = useState<NodeJS.Timeout | null>(
    null,
  );
  const [imageName, setImageName] = useState<string>("");
  const [showProgressbar, setShowProgressbar] = useState(false);
  const [value, setValue] = useState(0);
  const [errors, setErrors] = useState<Errors>({});

  const handleImageUpload = async (file: File) => {
    try {
      const storageRef = ref(storage, `user-images/${uuidv4()}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

          setShowProgressbar(true);
          setValue(progress);
        },
        (error) => {
          setShowProgressbar(false);
          throw error;
        },
      );

      await new Promise((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          () => { },
          (error) => reject(error),
          () => resolve(null),
        );
      });

      const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

      return downloadURL;
    } catch (error) {
      throw error;
    }
  };





  const handleFileChange = (files: File[]) => {
    if (files.length > 0) {
      setImage(files[0]);
      setImageName(files[0].name);
      setValue(0);
      setShowProgressbar(false);
      const error = validateImage(files[0]);

      setErrors((prevErrors) => ({ ...prevErrors, image: error }));
    }
  };

  const validate = () => {
    const errors: Errors = {};


    const imageError = validateImage(image);

    if (imageError) errors.image = imageError;

    return errors;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const validateErrors = validate();

    if (Object.keys(validateErrors).length > 0) {
      setErrors(validateErrors);

      return;
    }
  
    setErrors({});
    setMessage("");

    try {
      let imageUrl = "";
      if (image) {
        imageUrl = await handleImageUpload(image);
      }
      await addDoc(collection(db, "bugReports"), {
        
        imageUrl,
        createdAt: new Date(),
      });
      setMessage("Image submitted successfully");
     
      setImage(null);
      setImageName("");
      setShowProgressbar(false);
     
      if (messageTimeout) {
        clearTimeout(messageTimeout);
      }
      setMessageTimeout(
        setTimeout(() => {
          setMessage("");
        }, 3000),
      );
      
    } catch (error) {
      setMessage("Failed to submit bug report!");
      if (messageTimeout) {
        clearTimeout(messageTimeout);
      }
      setMessageTimeout(
        setTimeout(() => {
          setMessage("");
        }, 3000),
      );
    
    }
  };


const { getRootProps, getInputProps } = useDropzone({
  onDrop: handleFileChange,
  multiple: false,
  accept: {
    "image/*": [],
  },
});

return (
  <Modal
    backdrop="blur"
    isDismissable={false}
    isKeyboardDismissDisabled={true}
    isOpen={isOpen}
    placement="center"
    scrollBehavior="inside"
    size="3xl"
    onOpenChange={onClose}
  >
    <ModalContent>
      <ModalHeader className="mt-2 mx-auto">
        <SinglePortfolioHeader
          headerInfo={{
            title: `bug report form`.toUpperCase(),
            subtitle: `Report a Bug`,
            description: `Please fill the form below with all information related to Bug`,
            color: `${theme === "dark" ? "danger" : "primary"}`,
          }}
        />
      </ModalHeader>
      <ModalBody>
        <form onSubmit={handleSubmit}>
          <div className="flex w-full flex-wrap md:flex-nowrap gap-3">
            <div className="md:w-1/2 w-full">
              <Input
                label="Full Name"
                placeholder="Enter your full name"
                type="text"
                value={fullName}
                variant="bordered"
                onChange={handleNameChange}
              />
              <span className="h-5 inline-flex justify-start items-center w-full md:mb-1">
                {errors.name && (
                  <small className="text-red-500 font-medium">
                    {errors.name}
                  </small>
                )}
              </span>
            </div>
            <div className="md:w-1/2 w-full">
              <Input
                label="Email"
                placeholder="Enter your email"
                type="email"
                value={email}
                variant="bordered"
                onChange={handleEmailChange}
              />
              <span className="h-5 inline-flex justify-start items-center w-full mb-3 md:mb-1">
                {errors.email && (
                  <small className="text-red-500 font-medium">
                    {errors.email}
                  </small>
                )}
              </span>
            </div>
          </div>
          <Input
            label="Title"
            placeholder="Enter bug title"
            type="text"
            value={title}
            variant="bordered"
            onChange={handleTitleChange}
          />
          <span className="h-5 inline-flex justify-start items-center w-full mb-3 md:mb-1">
            {errors.title && (
              <small className="text-red-500 font-medium">
                {errors.title}
              </small>
            )}
          </span>
          <Textarea
            disableAnimation
            disableAutosize
            classNames={{
              base: "max-w-full",
              input: "resize-y min-h-[40px]",
            }}
            label="Description"
            placeholder="Enter bug description"
            value={description}
            variant="bordered"
            onValueChange={handleDescriptionChange}
          />
          <span className="h-5 inline-flex justify-start border- items-center w-full mb-3 md:mb-1">
            {errors.description && (
              <small className="text-red-500 font-medium">
                {errors.description}
              </small>
            )}
          </span>
          <div
            {...getRootProps({
              className:
                "dropzone md:h-40 h-32 border-2 rounded-xl border-dashed border-gray-400/40 flex items-center justify-center flex-col gap-2 px-0.5 sm:px-0 focus:outline-none outline-none focus:ring-2 hover:border-solid hover:border-default-400 dark:hover:border-default-400 focus:ring-gray-800 dark:focus:ring-default-900 focus:border-gray-400/0 dark:focus:border-gray-400/0 cursor-pointer relative shadow-sm shadow-gray-400/50 dark:shadow-none",
            })}
          >
            <input {...getInputProps()} />
            <div className="text-center text-gray-500 cursor-pointer">
              {imageName ? (
                <div className="flex justify-center items-center md:gap-3 gap-2 flex-col">
                  <p className="dark:text-neutral-300 text-neutral-500 md:text-sm text-xs">
                    Selected file: {imageName}
                  </p>
                  {showProgressbar && (
                    <Progress
                      aria-label="Uploading..."
                      classNames={{
                        base: "max-w-md",
                        track: "drop-shadow-md border border-default",
                        indicator:
                          "bg-gradient-to-r dark:from-purple-500 dark:to-yellow-500 from-blue-500 to-green-500 ",
                        label:
                          "md:tracking-wider tracking-wide font-medium text-default-600",
                        value: "text-foreground/60",
                      }}
                      color="success"
                      label="Image Uploading..."
                      radius="md"
                      showValueLabel={true}
                      size="md"
                      value={value}
                    />
                  )}
                </div>
              ) : (
                <div className="flex justify-center items-center md:gap-2 gap-1 flex-col">
                  <p className="dark:text-neutral-400 text-neutral-500  md:text-sm text-xs">
                    Drag &apos; n&apos; drop an image here, or click to select
                    an image
                  </p>
                  <p className="text-xs dark:text-neutral-500 text-neutral-400 ">
                    Only JPEG, PNG, and GIF images are allowed
                  </p>
                </div>
              )}
            </div>
            <div className="absolute top-2 left-3 text-xs font-normal dark:text-neutral-300 text-neutral-600">
              Bug Image
            </div>
          </div>
          <span className="h-5 inline-flex justify-start items-center w-full">
            {errors.image && (
              <small className="text-red-500 font-medium">
                {errors.image}
              </small>
            )}
          </span>
          <div
            className="min-h-28 h-full w-full mt-3"
            style={{
              overflow: "auto",
              position: "relative",
              background: "transparent",
            }}
          >
            <ReCAPTCHA
              ref={recaptchaRef}
              badge="bottomleft"
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
              size="normal"
              onChange={(token: any) => setRecaptchaToken(token)}
              onExpired={() => setRecaptchaToken(null)}
            />
            <span className="h-5 inline-flex justify-start items-center w-full">
              {errors.recaptcha && (
                <small className="text-red-500 font-medium">
                  {errors.recaptcha}
                </small>
              )}
            </span>
          </div>
          <div className="h-4 flex justify-center items-center">
            {message && (
              <p className="dark:text-green-500 text-green-600 relative lg:text-sm text-xs">
                {message}
              </p>
            )}
          </div>
          <ModalFooter>
            <Button
              color="danger"
              radius="sm"
              size="md"
              type="button"
              variant="flat"
              onPress={onClose}
            >
              Close
            </Button>
            <Button
              className="dark:bg-zinc-700 bg-buttonDark dark:text-neutral-100 tracking-wide text-sm font-medium text-neutral-100   c"
              radius="sm"
              size="md"
              type="submit"
              variant="solid"
            >
              Submit
            </Button>
          </ModalFooter>
        </form>
      </ModalBody>
    </ModalContent>
  </Modal>
);
};

export default BugReportFormModal;
