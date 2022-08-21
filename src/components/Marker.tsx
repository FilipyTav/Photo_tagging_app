import { FC, RefObject, useEffect, useState } from "react";

interface Props {
    top_bar: RefObject<HTMLDivElement>;
}

const Marker: FC<Props> = ({ top_bar }) => {
    const [active, set_active] = useState(false);
    let select_click = false;

    const [position, set_position] = useState<{ x: number; y: number }>({
        x: 0,
        y: 0,
    });

    let top_rect: DOMRect | null;

    useEffect(() => {
        add_event_listeners();
        top_rect = top_bar.current!.getBoundingClientRect();

        return () => remove_event_listeners();
    }, []);

    const add_event_listeners = (): void => {
        document.addEventListener("click", on_select_click);
    };

    const remove_event_listeners = (): void => {
        document.removeEventListener("click", on_select_click);
    };

    const on_select_click = (e: MouseEvent): void => {
        const x = e.pageX;
        const y = e.pageY;

        // TODO: make it so it no longer activates out of the container element
        // In the docs, the positions in getBoundingClientRect are relative to the viewport,
        // however, here it seems to be absolute(relative to the whole webcontent)
        const border = top_rect!.bottom;

        if (y <= border) return;

        if (!select_click) {
            set_position({ x, y });

            set_active(true);
            select_click = true;
            return;
        }

        set_position({ x: 0, y: 0 });

        set_active(false);
        select_click = false;
    };

    return (
        <>
            <div
                className={`marker ${active ? "active" : ""}`}
                style={{ left: position.x, top: position.y }}
            ></div>
        </>
    );
};

export default Marker;
