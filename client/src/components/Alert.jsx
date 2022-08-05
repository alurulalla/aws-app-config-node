import { Alert, AlertIcon, Stack } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";

const AlertComponent = () =>
{
    const [promotionalOffer, setPromotionalOffer] = useState({});

    const getOffers = async () =>
    {
        const { data } = await axios.get('/api/offers');
        setPromotionalOffer(data);
    }

    useEffect(() =>
    {
        getOffers();
    }, []);

    return (
        <>
            {promotionalOffer?.enabled && <Stack spacing={3}>
                <Alert status='success'>
                    <AlertIcon />
                    10% discount for new users! Hurry up !!
                </Alert>
            </Stack>}
        </>
    );
}

export default AlertComponent;