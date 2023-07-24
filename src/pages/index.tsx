/* eslint-disable prettier/prettier */
import * as Tabs from '@radix-ui/react-tabs'
import React, { useState, useEffect } from 'react'

import { api } from '@/utils/client/api'
import { CreateTodoForm } from '@/client/components/CreateTodoForm'
import { TodoList } from '@/client/components/TodoList'

/**
 * QUESTION 6:
 * -----------
 * Implement quick filter/tab feature so that we can quickly find todos with
 * different statuses ("pending", "completed", or both). The UI should look like
 * the design on Figma.
 *
 * NOTE:
 *  - For this question, you must use RadixUI Tabs component. Its Documentation
 *  is linked below.
 *
 * Documentation references:
 *  - https://www.radix-ui.com/docs/primitives/components/tabs
 */
export interface TodoSchema {
  id: number
  body: string
  status: string
}

const Index = () => {
  const [activeTab, setActiveTab] = useState('getAll')
  const [pendingTodos, setPendingTodos] = useState<TodoSchema[]>([])
  const [completedTodos, setCompletedTodos] = useState<TodoSchema[]>([])
  const { data: todos = [] } = api.todo.getAll.useQuery({
    statuses: ['completed', 'pending'],
  })

  function handleChangeTab(value: string) {
    setActiveTab(value)
  }

  useEffect(() => {
    if (todos) {
      todos.sort((a: TodoSchema, b: TodoSchema) => {
        if (a.status === 'pending' && b.status === 'completed') {
          return -1
        } else if (a.status === 'completed' && b.status === 'pending') {
          return 1
        } else {
          return 0
        }
      })
      setPendingTodos(todos.filter((todo) => todo.status === 'pending'))
      setCompletedTodos(todos.filter((todo) => todo.status === 'completed'))
    }
  }, [todos])

  return (
    <main className="mx-auto w-[480px] pt-12 font-sans">
      <div className="rounded-12 bg-white p-8 shadow-sm">
        <h1 className="text-center text-4xl font-extrabold text-gray-900">
          Todo App
        </h1>
        <Tabs.Root
          onValueChange={handleChangeTab}
          defaultValue="getAll"
          orientation="vertical"
        >
          <Tabs.List
            className="my-10 flex h-[44px] w-[416px] gap-2"
            aria-label="tabs example"
          >
            <Tabs.Trigger
              className={` rounded-full border border-gray-200 px-6 py-3 text-sm font-bold leading-5 duration-300 ${activeTab === 'getAll'
                  ? 'bg-gray-700 text-white'
                  : 'bg-white text-gray-700'
                }`}
              value="getAll"
            >
              All
            </Tabs.Trigger>
            <Tabs.Trigger
              className={`rounded-full border border-gray-200 px-6 py-3 text-sm font-bold leading-5 duration-300 ${activeTab === 'pending'
                  ? 'bg-gray-700 text-white '
                  : 'bg-white text-gray-700'
                }`}
              value="pending"
            >
              Pending
            </Tabs.Trigger>
            <Tabs.Trigger
              className={`rounded-full border border-gray-200 px-6 py-3 text-sm font-bold leading-5 duration-300 ${activeTab === 'completed'
                  ? 'bg-gray-700 text-white '
                  : 'bg-white text-gray-700'
                }`}
              value="completed"
            >
              Completed
            </Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="getAll">
            <TodoList todos={todos} />
          </Tabs.Content>
          <Tabs.Content value="pending">
            <TodoList todos={pendingTodos} />
          </Tabs.Content>
          <Tabs.Content value="completed">
            <TodoList todos={completedTodos} />
          </Tabs.Content>
        </Tabs.Root>
        <div className="pt-10">
          <CreateTodoForm />
        </div>
      </div>
    </main>
  )
}

export default Index
