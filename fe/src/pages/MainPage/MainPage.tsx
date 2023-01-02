import React, {useEffect, useRef, useState} from "react";
import './main-page.scss';
import {CommandHandler} from "./main-page.namespace";
import {Loader} from "../../components/Loader/Loader";

export const MainPage = () => {
    // command stack and loading toggler
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [commandsStack, setCommandsStack] = useState<string[]>([
        "Are you winning son? - No dad i'm coding.",
        '(type "--help" to get help)',
        'use arrow up and down to use past commands',
        '...'
    ]);
    // on keys down focus to input
    const inputField = useRef<HTMLInputElement | null>(null);
    const mainWrapperRef = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        const eFunc = () => {
            if (inputField.current) inputField.current.focus();
        }
        if (mainWrapperRef.current) {
            mainWrapperRef.current.addEventListener('keydown', eFunc);
        }
        return () => {
            mainWrapperRef.current?.removeEventListener('keydown', eFunc);
        }
    }, []);
    // on press enter execute command
    const handleInputPressEnter = async (command: string) => {
        inputField.current!.value = '';
        let newStack = stack.map(i => i);
        newStack.push(command);
        setStack(newStack);
        stackIndex.current = newStack.length;
        setIsLoading(true);
        const newArr = await CommandHandler(commandsStack, command);
        setCommandsStack(newArr);
        setIsLoading(false);
    }
    // arrows func and state to select prev commands from stack
    const [stack, setStack] = useState<string[]>([]);
    const stackIndex = useRef<number>(0);
    const handleSwitchCommands = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.code === 'ArrowUp') {
            if (stackIndex.current > 0) stackIndex.current = stackIndex.current - 1;
            inputField.current!.value = stack[stackIndex.current];
        } else {
            if (stackIndex.current < stack.length - 1) {
                stackIndex.current = stackIndex.current + 1;
                inputField.current!.value = stack[stackIndex.current];
            }
        }

    };

    return (
        <section
            ref={mainWrapperRef}
            tabIndex={0}
        >
            <div className={'output'}>
                <ul>
                    {(() => {
                        return (
                            <>
                                {
                                    commandsStack.reverse().map((i, n) => { // not recommended to use index, but here it is ok
                                        return (<li key={n}>{i}</li>);
                                    })
                                }
                            </>
                        )
                    })()
                    }
                </ul>
                {
                    isLoading
                        ? <Loader/>
                        : null
                }
                <input
                    ref={inputField}
                    autoFocus={true}
                    type={'text'}
                    onKeyDown={(e) => {
                        if ((e.code === 'Enter' || e.code === 'NumpadEnter') && e.currentTarget.value.length > 0) {
                            handleInputPressEnter(e.currentTarget.value);
                        }
                        if (e.code === 'ArrowUp' || e.code === 'ArrowDown') {
                            handleSwitchCommands(e)
                        }
                    }}
                />
            </div>
        </section>
    )
}