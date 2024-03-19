"use client";
import useConversation from "@/hooks/useConversation";
import axios from "axios";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import MessageInput from "./MessageInput";
import { HiPaperAirplane } from "react-icons/hi";
import { CldUploadButton } from "next-cloudinary";
import { HiPhoto } from "react-icons/hi2";

type FormProps = {};

const Form = ({}: FormProps) => {
  const { conversationId } = useConversation();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      message: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setValue("message", "");
    axios.post("/api/messages", {
      ...data,
      conversationId,
    });
  };

  const handleUpload = (result: any) => {
    axios.post("/api/messages", {
      image: result.info.secure_url,
      conversationId,
    });
  };
  return (
    <div className="flex items-center w-full gap-2 px-4 py-4 bg-white border-t lg:gap-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center w-full gap-2 lg:gap-4"
      >
        <CldUploadButton
          options={{ maxFiles: 1 }}
          onUpload={handleUpload}
          uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_PRESET}
        >
          <HiPhoto size={30} className="text-orange-500" />
        </CldUploadButton>
        <MessageInput
          id="message"
          register={register}
          errors={errors}
          required
          placeholder="채팅을 입력해주세요."
        />
        <button
          type="submit"
          className="p-2 transition rounded-full cursor-pointer bg-orange-500 hover:bg-orange-600"
        >
          <HiPaperAirplane size={18} className="text-white" />
        </button>
      </form>
    </div>
  );
};

export default Form;
