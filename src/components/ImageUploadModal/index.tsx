"use client";

import { Button } from "@nextui-org/button";
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
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { v4 as uuidv4 } from "uuid";
import { validateImage } from "@/lib/validations";
import { db, storage } from "@/utils/firebase";

interface Errors {
  image?: string;
}

const ImageUploadModal = ({ isOpen, onClose }: any) => {
  const [image, setImage] = useState<File | null>(null);
  const [message, setMessage] = useState<string>("");
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
      await addDoc(collection(db, "userImages"), {
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
      setMessage("Failed to submit image!");
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
      classNames={{
        body: "py-6",
        base: "border-[#292f46] bg-cardHo text-textHo",
        header: "border-b-[1px] border-gray-400/40",
        footer: "border-t-[1px] border-gray-400/40",
      }}
    >
      <ModalContent>
        <ModalHeader className="mt-2 mx-auto">
          <h2 className="text-2xl font-semibold text-white">Upload an Image</h2>
        </ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit}>
            <div
              {...getRootProps({
                className:
                  "dropzone md:h-40 h-32 border-2 rounded-xl border-dashed border-gray-400/40 flex items-center justify-center flex-col gap-2 px-0.5 sm:px-0 focus:outline-none outline-none focus:ring-2 hover:border-solid hover:border-gray-400 focus:ring-gray-500  focus:border-gray-400/0  cursor-pointer relative shadow-sm shadow-gray-400/50",
              })}
            >
              <input {...getInputProps()} />
              <div className="text-center text-gray-500 cursor-pointer">
                {imageName ? (
                  <div className="flex justify-center items-center md:gap-3 gap-2 flex-col">
                    <p className="text-neutral-500 md:text-sm text-xs">
                      Selected file: {imageName}
                    </p>
                    {showProgressbar && (
                      <Progress
                        aria-label="Uploading..."
                        classNames={{
                          base: "max-w-md",
                          track: "drop-shadow-md border border-default",
                          indicator:
                            "bg-gradient-to-r from-blue-500 to-green-500 ",
                          label:
                            "md:tracking-wider tracking-wide font-medium text-gray-300",
                          value: "text-green-500",
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
                    <p className=" text-neutral-500  md:text-sm text-xs">
                      Drag &apos; n&apos; drop an image here, or click to select
                      an image
                    </p>
                    <p className="text-xs  text-neutral-400 ">
                      Only JPEG, PNG, and GIF images are allowed
                    </p>
                    <p className="text-xs  text-neutral-400 ">
                      (Max file size: 5MB)
                    </p>
                  </div>
                )}
              </div>
              <div className="absolute top-2 left-3 text-xs font-normal text-neutral-400">
                User Image
              </div>
            </div>
            <span className="h-5 inline-flex justify-start items-center w-full">
              {errors.image && (
                <small className="text-red-500 font-medium">
                  {errors.image}
                </small>
              )}
            </span>

            <div className="h-4 flex justify-center items-center mb-2">
              {message && (
                <p className="text-green-600 relative lg:text-sm text-xs">
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
                variant="ghost"
                onPress={onClose}
              >
                Close
              </Button>
              <Button
                color="secondary"
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

export default ImageUploadModal;
