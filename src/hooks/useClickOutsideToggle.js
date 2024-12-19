import { useEffect, useRef, useState } from "react";

/**
 * Custom hook that manages the toggle state of a burger menu and detects clicks outside of it.
 * 
 * @returns {Object} An object containing:
 * - `expanded`: A boolean indicating whether the menu is expanded.
 * - `setExpanded`: A function to update the expanded state.
 * - `ref`: A ref object to be attached to the burger icon element.
 * 
 * The hook adds an event listener to the document to detect mouseup events
 * and collapses the menu if a click occurs outside the referenced element.
 */
const useClickOutsideToggle = () => {
    // keep track of the burger menu
    const [expanded, setExpanded] = useState(false);

    // hold a reference to the burger icon
    const ref = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                setExpanded(false);
            }
        }

        document.addEventListener('mouseup', handleClickOutside);
        return () => {
            document.removeEventListener('mouseup', handleClickOutside);
        }
    }, [ref])

    return { expanded, setExpanded, ref };
};

export default useClickOutsideToggle;