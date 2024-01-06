import './App.css'
import {useState} from "react";

type File = {
    name: string,
    children?: File[]
}

type Files = {
    children: File[]
}

const files: Files = {
    children: [
        {
            name: 'level0-1',
            children: [
                {
                    name: 'level1-1',
                    children: [
                        {
                            name: 'level2-1',
                            children: [
                                {
                                    name: 'level3-1',
                                }
                            ]
                        }
                    ]
                },
                {
                    name: 'level1-2'
                }
            ],
        },
        {
            name: 'level0-2',
            children:
                [
                    {
                        name: 'level1-21'
                    }
                ]
        }
    ]
}

interface INode {
    child: File,
    level: number,
    show?: boolean
}

interface ITick {
    show: boolean
}

function Tick({show}: ITick) {
    return show ? '-' : '+'
}

function Node({child, level}: INode) {
    const {name, children} = child;

    const [showChildren, setShowChildren] = useState(false);

    const handleClick = () => {
        setShowChildren(show => !show);
    };

    return (<div style={{paddingLeft: `${level === 0 ? 0 : 40}px`}} key={name}>
        {children ? (
            <button onClick={handleClick}>
                <Tick show={showChildren}/> {name}
            </button>
        ) : name}
        {children && showChildren && (
            children.map((child: File) => <Node
                key={child.name}
                child={child} level={level + 1}
            />)
        )}
    </div>)
}

function App() {
    return (
        <>
            {files.children.map((child: File, index) => <Node key={index} child={child} level={0}/>)}
        </>
    )
}

export default App
