interface AddToolParams {
    tempTool: string;
    processForm: {
        tools: string[];
        [key: string]: any; 
    };
    setProcessForm: React.Dispatch<React.SetStateAction<any>>;
    setTempTool: React.Dispatch<React.SetStateAction<string>>;
}

export const addTool = ({ tempTool, processForm, setProcessForm, setTempTool }: AddToolParams): void => {
    if (tempTool && !processForm.tools.includes(tempTool)) {
        setProcessForm({
            ...processForm,
            tools: [...processForm.tools, tempTool]
        });
        setTempTool('');
    }
};