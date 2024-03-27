import React, { useState } from 'react';
import { Badge, Tooltip, Sidebar } from 'flowbite-react';

const SidebarComponent = ({ data, onNewMarkerDragEnd }) => {
  
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    <Sidebar aria-label="options sidebar" className="options-sidebar">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Collapse label="Slimes">
            <Sidebar.Item>
              <div className="grid grid-cols-4 gap-3">
                {data.slimesList.map(slime => {
                    return (
                      <div 
                        key={slime.id}
                        onDragEnd={() => onNewMarkerDragEnd(slime, event)}
                        draggable
                      >
                        <Tooltip content={slime.attributes.Name} style="light">
                          <img
                            src= {process.env.NEXT_PUBLIC_API_URL + slime.attributes.Icon.data.attributes.url}
                            alt={slime.attributes.Name}
                            className="w-8"
                          >
                          </img>
                        </Tooltip>
                      </div>
                    )
                })}
              </div>
            </Sidebar.Item>
          </Sidebar.Collapse>
          <Sidebar.Collapse label="Food">
            <Sidebar.Item>
              <div className="grid grid-cols-4 gap-3">
                {data.foodList.map(food => {
                      return (
                        <div 
                          key={food.id} 
                          onDragEnd={() => onNewMarkerDragEnd(food, event)}
                          draggable
                        >
                          <img
                            src= {process.env.NEXT_PUBLIC_API_URL + food.attributes.Icon.data.attributes.url}
                            alt={food.attributes.Name}
                            className="w-8"
                          >
                          </img>
                        </div>
                      )
                })}
              </div>
            </Sidebar.Item>
          </Sidebar.Collapse>
          <Sidebar.Collapse label="Buildings">
            <Sidebar.Item>
              <div className="grid grid-cols-4 gap-3">
                {data.buildingList.map(building => {
                      return (
                        <div 
                          key={building.id} 
                          onDragEnd={() => onNewMarkerDragEnd(building, event)}
                          draggable
                        >
                          <img
                            src= {process.env.NEXT_PUBLIC_API_URL + building.attributes.Icon.data.attributes.url}
                            alt={building.attributes.Name}
                            className="w-8"
                          >
                          </img>
                        </div>
                      )
                })}
              </div>
            </Sidebar.Item>
          </Sidebar.Collapse>
          <Sidebar.Collapse label="Gadgets">
            <Sidebar.Item>
              <div className="grid grid-cols-4 gap-3">
                {data.gadgetList.map(gadget => {
                      return (
                        <div 
                          key={gadget.id} 
                          onDragEnd={() => onNewMarkerDragEnd(gadget, event)}
                          draggable
                        >
                          <img
                            src= {process.env.NEXT_PUBLIC_API_URL + gadget.attributes.Icon.data.attributes.url}
                            alt={gadget.attributes.Name}
                            className="w-8"
                          >
                          </img>
                        </div>
                      )
                })}
              </div>
            </Sidebar.Item>
          </Sidebar.Collapse>
      </Sidebar.ItemGroup>
    </Sidebar.Items>
    {isVisible && (
    <Sidebar.CTA>
        <div className="mb-3 flex items-center">
          <Badge color="green" className="font-bold">Hi there!</Badge>
          <button
            aria-label="Close"
            className="-m-1.5 ml-auto inline-flex h-6 w-6 rounded-lg bg-gray-100 p-1 text-cyan-900 hover:bg-gray-200 focus:ring-2 focus:ring-gray-400 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600"
            type="button"
            onClick={handleClose}
          >
            <svg
              aria-hidden
              className="h-4 w-4"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        <div className="mb-3 text-sm text-cyan-900 dark:text-gray-400">
          I'm Bronwyn, a full-stack web developer based in Sydney.
        </div>
        <ul className="mb-3 list-disc list-inside">
          <li>
            <a
              className="text-sm text-cyan-900 underline hover:text-cyan-800 dark:text-gray-400 dark:hover:text-gray-300"
              href="https://www.linkedin.com/in/bronwyn-waterhouse/"
              target="_blank"
            >
              Let's connect!
            </a>
          </li>
          <li>
            <a
              className="text-sm text-cyan-900 underline hover:text-cyan-800 dark:text-gray-400 dark:hover:text-gray-300"
              href="https://motherofchownz.github.io/portfolio/"
              target="_blank"
            >
              Or, check out my portfolio
            </a>
          </li>
        </ul>
        <div className="mb-2 text-xs text-cyan-900 dark:text-gray-400">
        <a
          className="text-xs text-cyan-900 underline hover:text-cyan-800 dark:text-gray-400 dark:hover:text-gray-300"
          href="https://www.instagram.com/motherofchownz/"
          target="_blank"
        >
          Pssst... do you like Chow Chows?
        </a>
        </div>
      </Sidebar.CTA>
    )}
  </Sidebar>
  );
};

export default SidebarComponent;