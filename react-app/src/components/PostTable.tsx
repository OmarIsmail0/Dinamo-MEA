/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { lazy, Suspense, useEffect, useState } from "react";

const PostForm = lazy(() => import("./PostForm"));

import { Table, Typography, Space, Form, Button, Modal, Input } from "antd";
import { ColumnsType } from "antd/es/table";

import { deletePost, fetchPosts, updatePost } from "../api/posts";
import { Post } from "../interfaces/Post";
import { formatError, truncateText } from "../utils/helpers";
import { Notification } from "./Notification";

const { Title } = Typography;

const PostTable: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [currentPost, setCurrentPost] = useState<Post | null>(null);

  const [form] = Form.useForm();

  const loadPosts = async () => {
    setLoading(true);
    try {
      const data = await fetchPosts();
      setPosts(data);
    } catch (error: any) {
      Notification.error("Error Fetching Posts", formatError(error));
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (post: Post) => {
    setCurrentPost(post);
    form.setFieldsValue(post);
    setIsModalVisible(true);
  };

  const handleEditSubmit = async (values: { title: string; body: string }) => {
    if (!currentPost) return;
    setLoading(true);
    try {
      const updatedPost = await updatePost(currentPost.id, { ...currentPost, ...values });
      setPosts((prev) => prev.map((p) => (p.id === updatedPost.id ? updatedPost : p)));
      Notification.success("Post Updated", `Post with ID ${updatedPost.id} has been successfully updated.`);
      setIsModalVisible(false);
    } catch (error: any) {
      Notification.error("Error Updating Post", error.message || "Failed to update the post.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    setLoading(true);
    try {
      await deletePost(id);
      setPosts((prev) => prev.filter((post) => post.id !== id)); // Remove the post from state
      Notification.success("Post Deleted", `Post with ID ${id} has been successfully deleted.`);
    } catch (error: any) {
      Notification.error("Error Deleting Post", error.message || "Failed to delete the post.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const columns: ColumnsType<Post> = [
    {
      title: "USER ID",
      dataIndex: "userId",
      key: "userId",
      width: 100,
      align: "center",
    },
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 80,
      align: "center",
    },
    {
      title: "TITLE",
      dataIndex: "title",
      key: "title",
      render: (text: string) => <Typography.Text strong>{truncateText(text, 20)}</Typography.Text>,
    },
    {
      title: "BODY",
      dataIndex: "body",
      key: "body",
      ellipsis: true,
    },
    {
      title: "ACTIONS",
      key: "actions",
      render: (_, post: Post) => (
        <Space>
          <Button type="link" onClick={() => handleEdit(post)}>
            Edit
          </Button>
          <Button type="link" danger onClick={() => handleDelete(post.id)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Suspense fallback={<div>Loading Form...</div>}>
        <PostForm onPostCreated={(newPost) => setPosts((prev) => [newPost, ...prev])} />
      </Suspense>

      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <Title level={3} style={{ textAlign: "center" }}>
          Posts Table
        </Title>

        <Table<Post>
          dataSource={posts}
          columns={columns}
          rowKey="id"
          loading={loading}
          bordered
          pagination={{ pageSize: 5 }}
          size="middle"
        />
        <Modal
          title="Edit Post"
          open={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          onOk={() => form.submit()}
          confirmLoading={loading}
        >
          <Form form={form} layout="vertical" onFinish={handleEditSubmit}>
            <Form.Item label="Title" name="title" rules={[{ required: true, message: "Please enter the title!" }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Body" name="body" rules={[{ required: true, message: "Please enter the body!" }]}>
              <Input.TextArea rows={4} />
            </Form.Item>
          </Form>
        </Modal>
      </Space>
    </div>
  );
};

export default PostTable;
