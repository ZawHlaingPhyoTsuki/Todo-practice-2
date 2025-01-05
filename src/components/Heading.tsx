'use client';

import useTaskStore from '@/store/useTaskStore';
import React from 'react'

export default function Heading() {
    const { tasks } = useTaskStore();

  return (
    <h1 className="text-2xl font-bold mx-auto">
      All Tasks (Total {tasks.length}, Done{" "}
      {tasks.filter((el) => el.completed).length})
    </h1>
  );
}
