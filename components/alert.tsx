import { AlertCircleIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";

export function AlertError({message}: {message: string}){
    return(
        <Alert variant="destructive">
            <AlertCircleIcon />
            <AlertTitle>Ошибка</AlertTitle>
            <AlertDescription>
                {message}
            </AlertDescription>
        </Alert>
    )
}
