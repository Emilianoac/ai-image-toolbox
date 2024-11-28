"use client";

import { useState, useRef, useEffect } from "react";
import Styles from "./AppDropdown.module.css";

interface AppDropdownProps extends React.HTMLAttributes<HTMLElement> {
  items: string[];
  title: string;
  selecItem: (item: number) => void;
  currentItem?: number;
  children?: React.ReactNode;
}

export default function AppDropdown({
  items,
  title,
  children,
  selecItem,
  currentItem,
}: AppDropdownProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [dropDirectionUp, setDropDirectionUp] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (showDropdown && dropdownRef.current && listRef.current) {
      const dropdownRect = dropdownRef.current.getBoundingClientRect();
      const listHeight = listRef.current.offsetHeight;
      const availableSpaceBelow = window.innerHeight - dropdownRect.bottom;
      
      setDropDirectionUp(availableSpaceBelow < listHeight);
    }
  }, [showDropdown]);

  return (
    <div className={`${Styles['app-dropdown']}`} ref={dropdownRef}>
      {/* Botón */}
      <button
        title={title}
        className="action-button"
        onClick={() => setShowDropdown(!showDropdown)}
        type="button"
      >
        {children ? children : title}
      </button>

      {/* Dropdown */}
      {showDropdown && (
        <div
          ref={listRef}
          className={`${Styles['app-dropdown__list']} ${
            dropDirectionUp ? Styles['app-dropdown__list--up'] : ""
          }`}
        >
          <span className="block font-bold text-xs px-4 mb-4 mt-3 select-none">{title}</span>
          <ul>
            {items.map((item, i) => (
              <li
                className={`${Styles['app-dropdown__item']} ${
                  currentItem === i && Styles.current
                }`}
                onClick={() => selecItem(i)}
                key={item}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
