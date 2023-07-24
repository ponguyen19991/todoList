import * as Tabs from '@radix-ui/react-tabs'
import React, { useState } from 'react'

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

const Index = () => {
  const [activeTab, setActiveTab] = useState('getAll')
  const { data: todos = [] } = api.todo.getAll.useQuery({
    statuses: ['completed', 'pending'],
  })

  const pendingTodos = todos.filter((todo) => todo.status === 'pending')
  const completedTodos = todos.filter((todo) => todo.status === 'completed')
  function handleChangeTab(value: string) {
    setActiveTab(value)
  }
  return (
    <main className="mx-auto w-[480px] pt-12">
      <div className="rounded-12 bg-white p-8 shadow-sm">
        <h1 className="text-center text-4xl font-extrabold text-gray-900">
          Todo App
        </h1>
        <Tabs.Root onValueChange={handleChangeTab} defaultValue="getAll" orientation="vertical">
          <Tabs.List className="my-10 w-[416px] h-[44px]" aria-label="tabs example">
            <Tabs.Trigger
              className={`border-black h-12 w-[66px] font-sans text-center text-[14px] font-bold leading-5 rounded-full border border-gray-200 duration-300 ${activeTab === 'getAll'
                ? 'ring-black bg-[#334155] text-white '
                : 'bg-[#fff]'
                }`}
              value="getAll"
            >
              All
            </Tabs.Trigger>
            <Tabs.Trigger
              className={`border-black mx-2.5 h-12 w-[104px] font-sans text-center text-[14px] font-bold leading-5 rounded-full border border-gray-200 duration-300 ${activeTab === 'pending'
                ? 'ring-black bg-[#334155] text-white '
                : 'bg-[#fff]'
                }`}
              value="pending"
            >
              Pending
            </Tabs.Trigger>
            <Tabs.Trigger
              className={`border-black h-12 w-[124px] font-sans text-center text-[14px] font-bold leading-5 rounded-full border border-gray-200 duration-300 ${activeTab === 'completed'
                ? 'ring-black bg-[#334155] text-white '
                : 'bg-[#fff]'
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
