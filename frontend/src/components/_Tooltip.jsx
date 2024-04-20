import React from 'react'
import { Info } from 'lucide-react'

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"


const _Tooltip = ({ note }) => {

    let content

    if (note) {
        content = (
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger>
                        <Info className='w-4 h-4 text-blue-600' />
                    </TooltipTrigger>
                    <TooltipContent>
                        <pre>{note}</pre>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        )
    } else {
        content = ''
    }

    return content
}

export default _Tooltip