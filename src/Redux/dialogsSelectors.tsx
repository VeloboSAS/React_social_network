import { createSelector } from "reselect";
import { AppStateType } from "./redux-store";

const getDialogsPagesSelector = (state: AppStateType) => {
    return state.dialogsPages.dialogs;
}

export const getDialogsPages = createSelector(getDialogsPagesSelector,  (dialogsPages) => {
    return dialogsPages.filter(d => true)
})
