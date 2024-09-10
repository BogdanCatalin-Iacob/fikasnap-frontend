import { useEffect, useRef, useState } from "react";

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