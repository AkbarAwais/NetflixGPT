import React from 'react'
import Login from './Login'
import Browse from './Browse'
import { createBrowserRouter } from 'react-router-dom'
import { RouterProvider } from 'react-router-dom'
import GptSearch from './GptSearch'


const Body = () => {
    const AppRouter = createBrowserRouter([
        {
            path: '/',
            element: <Login />
        },
        {
            path: "/browse",
            element: <Browse />
        },
        {
            path: "/search",
            element: <GptSearch />
        }
    ])

    return (
        <div>
            <RouterProvider router={AppRouter}>
            </RouterProvider>
        </div>

    )
}

export default Body
