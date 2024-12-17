/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { Form, Input, Button, Typography } from "antd";
import { createPost } from "../api/posts";
import { Post } from "../interfaces/Post";
import { Notification } from "./Notification";
import { formatError } from "../utils/helpers";

const { Title } = Typography;

interface PostFormProps {
  onPostCreated: (newPost: Post) => void;
}

const PostForm: React.FC<PostFormProps> = ({ onPostCreated }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      userId: Math.floor(Math.random() * 10) + 1,
    });
  }, [form]);

  const onFinish = async (values: { userId: number; id: number; title: string; body: string }) => {
    setLoading(true);
    try {
      const newPost = await createPost(values);
      console.log("Response: ", newPost);
      form.resetFields();
      Notification.success("Post Created", "Post successfully created.");
      onPostCreated(newPost);
    } catch (error: any) {
      console.log(error);
      Notification.error("Failed to Create Post", formatError(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "750px" }}>
      <Title level={3} style={{ textAlign: "center" }}>
        Add New Post
      </Title>
      <Form form={form} name="postForm" layout="vertical" onFinish={onFinish} autoComplete="off">
        <Form.Item name="id" hidden>
          <Input />
        </Form.Item>
        <Form.Item label="User ID" name="userId" hidden>
          <Input disabled />
        </Form.Item>
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: "Please enter the title of the post!" }]}
        >
          <Input placeholder="Enter post title" />
        </Form.Item>

        <Form.Item label="Body" name="body" rules={[{ required: true, message: "Please enter the body of the post!" }]}>
          <Input.TextArea placeholder="Enter post body" rows={4} maxLength={200} showCount />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} style={{ width: "100%" }}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default PostForm;
