import { currentUser } from '@/modules/authentication/actions'
import { Header } from '@/modules/Layout/components/header'
import { initializeWorkspace } from '@/modules/workspace/actions'
import React, { ReactNode } from 'react'


const RootLayout = async ({ children }: { children: ReactNode }) => {
    const user = await currentUser()
    //when the page load this workspace will be created if not exist
    const workspace = await initializeWorkspace()
    console.log("🚀 ~ RootLayout ~ workspace:", workspace)
    return (
        <>
            <Header user={user!} />

            <main className='max-h-[calc(100vh-4rem)] h-[calc(100vh-4rem)] flex flex-1 overflow-hidden'>
                <div className='flex h-full w-full'>
                    <div className='w-12 border-zinc-800 bg-zinc-800'>
                        fasdfasdf
                    </div>
                    <div className='flex-1 bg-zinc-900'>
                        {children}
                    </div>
                </div>

            </main>
        </>
    )
}

export default RootLayout