import { ComponentType, FC } from "react"
import Dialogs from "./Dialogs"
import { connect} from "react-redux"
import { withAuthRedirect } from "../../hoc/withAuthRedirect"
import { compose } from 'redux'
import { AppStateType } from '../../Redux/redux-store'
import {actions} from '../../Redux/dialogsReducer'

let mapStateToProps = (state: AppStateType) => {
    return {
        dialogsPage: state.dialogsPage,
    }}

export default compose<ComponentType>(
    connect(mapStateToProps, {...actions}),
    withAuthRedirect
)(Dialogs)

