"use client"; // Must be the first line in this file

import React from "react";
import { Table } from "antd";

// Define the Post type
interface Post {
  id: number;
  title: string;
  body: string;
}

// Client-side Ant Design Table
export default function PostsTable({ posts }: { posts: Post[] }) {
  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Title", dataIndex: "title", key: "title" },
    { title: "Body", dataIndex: "body", key: "body" },
  ];

  return <Table dataSource={posts} columns={columns} rowKey="id" bordered pagination={{ pageSize: 10 }} />;
}
