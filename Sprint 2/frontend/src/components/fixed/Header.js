import { Box, styled } from '@mui/material'
import React from 'react'
import headerImage from '../../assets/header.png';

const Header = () => {
    const StyleHeader = styled(Box)(({ theme }) => (
        {
            display: 'flex',
            justifyContent: 'center',
            alignItems: "center",
            minHeight: 600,
            backgroundImage: `url(${headerImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            width: "full",
            height: "30%",
        }
    ));
    return (
        <>
            <StyleHeader >
            </StyleHeader>
        </>
    )
}

export default Header