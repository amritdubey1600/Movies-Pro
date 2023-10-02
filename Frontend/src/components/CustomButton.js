import { Button } from "@mui/material";

const CustomButton = ({content})=>{
    return (
        <Button
            variant='outlined'
            sx={{
                margin: '4px',
                borderColor: '#fc3',
                color:'#fff',
                '&:hover': {
                bgcolor: '#fc3',
                borderColor: '#fc3',
                },
            }}
        >
            {content}
        </Button>
    );
}

export default CustomButton;