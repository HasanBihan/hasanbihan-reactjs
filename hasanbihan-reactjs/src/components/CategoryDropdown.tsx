import React, { useEffect } from 'react';
import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'
import { typeCategories, typeProduct } from "../types";
import {
  getCategories
} from "../network/network"



interface IProps {
  getSelectedCategory(arg?: typeCategories): void;
  create?: boolean
}

const CategoryDropdown: React.FC<IProps> = ({ getSelectedCategory, create }) => {

  const [selected, setSelected] = useState<any>({})
  const [categories, setCategories] = useState<typeCategories[]>([])

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    let response = await getCategories()
    if (create) {
      setSelected(response[0])
      setCategories(response)
      setCategory(response[0])
    } else {
      response = [...response, { id: "0", "name": "All Categories" }].sort((a, b) => Number(a.id) - Number(b.id))
      setSelected({ id: "0", "name": "All Categories" })
      setCategories(response)
    }
  }

  const setCategory = (object: typeCategories) => {
    getSelectedCategory(object)
    setSelected(object)
  }

  return (
    <div className="relative">
      <Listbox value={selected} onChange={setCategory}>
        <div className="relative">
          <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left  focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 text-sm">
            <span className="block truncate">{selected?.name}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <SelectorIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-11">
              {categories.map((category, index) => (
                <Listbox.Option
                  key={index}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-indigo-100 text-teal-900' : 'text-gray-900'
                    }`
                  }
                  value={category}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                          }`}
                      >
                        {category.name}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  )
}

export default CategoryDropdown