import { ApiResponseType, ResultCodesEnum } from './../api/api';
import { usersAPI } from "../api/usersApi"
import { follow, actions, unfollow } from "./usersReducer"

jest.mock('../api/usersApi')
const userAPIMock = usersAPI as jest.Mocked<typeof usersAPI>

const result: ApiResponseType = {
    resultCode: ResultCodesEnum.Success,
    messages: [],
    data: {}
}

const dispatchMock = jest.fn()
const getStateMock = jest.fn()

beforeEach(() => {
    dispatchMock.mockClear()
    getStateMock.mockClear()
    userAPIMock.follow.mockClear()
    userAPIMock.unfollow.mockClear()
})



// eslint-disable-next-line jest/valid-title
test('success follow thunk', async ()=> {

    userAPIMock.follow.mockReturnValue(Promise.resolve(result))
    const thunk = follow(1)
    

    await thunk(dispatchMock, getStateMock, {})

    expect(dispatchMock).toHaveBeenCalledTimes(3)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toogleFollowingProgress(true, 1))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.followSuccess(1))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toogleFollowingProgress(false, 1))

})

test('success unfollow thunk', async ()=> {
    
    userAPIMock.unfollow.mockReturnValue(Promise.resolve(result))
    const thunk = unfollow(1)

    await thunk(dispatchMock, getStateMock, {})

    expect(dispatchMock).toHaveBeenCalledTimes(3)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toogleFollowingProgress(true, 1))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.unfollowSuccess(1))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toogleFollowingProgress(false, 1))

})