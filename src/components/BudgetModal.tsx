import { Fragment } from 'react';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { Dialog, Transition } from '@headlessui/react';
import { useBudget } from '../hooks/useBudget';
import { EditBudgetForm } from './EditBudgetForm';

export default function BudgetModal() {

  const { state, dispatch } = useBudget();

  return (
    <>
      <Transition appear show={state.budgetModal} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => dispatch({type: 'hide-budget-modal'})}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-75" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <div
                    className='flex justify-end items-end w-full'
                    onClick={() => dispatch({ type: 'hide-budget-modal' })}
                  >
                    <XMarkIcon
                      className='text-white cursor-pointer size-6 bg-blue-500 rounded hover:bg-blue-600'
                    />
                  </div>

                <EditBudgetForm />

                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
