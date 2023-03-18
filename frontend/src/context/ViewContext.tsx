import { createContext, PropsWithChildren, useState } from "react";

//types
import { View, ViewContextType } from "../shared/types";

const ViewContext = createContext<ViewContextType | null>(null);

export const ViewProvider = (props: PropsWithChildren) => {
    const [view, setView] = useState(View.Guest);

    const changeView = (newView: View) => {
        setView(newView);
    };

    const value = { view, changeView };

    return (
        <ViewContext.Provider value={value}>
            {props.children}
        </ViewContext.Provider>
    );
};

export default ViewContext;
