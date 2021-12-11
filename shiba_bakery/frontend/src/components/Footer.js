import {
    Container,
    Grid,
    Box
    } from '@material-ui/core'
import React from "react";
import Link from '@material-ui/core/Link'


export default function Footer() {


    return <footer>
        <Box
             bgcolor="text.secondary"
             color="white"
        >

            <Container maxwidth="lg">
                <Grid container spacing={5}>

                    {/*This grid items contains the first column in the footer*/}
                    <Grid item xs={12} sm={4}>
                    <Box borderBottom={1}>Help</Box>
                    <Box>
                        <Link href="/" color="inherit">
                            Contact
                        </Link>
                    </Box>
                    </Grid>

                    {/*This grid items contains the second column in the footer*/}
                    <Grid item xs={12} sm={4}>
                        <Box borderBottom={1}>Help</Box>
                        <Box>
                            <Link href="/" color="inherit">
                                Contact
                            </Link>
                        </Box>
                    </Grid>

                    {/*This grid items contains the third column in the footer*/}
                    <Grid item xs={12} sm={4}>
                        <Box borderBottom={1}>Help</Box>
                        <Box>
                            <Link href="/" color="inherit">
                                Contact
                            </Link>
                        </Box>
                    </Grid>

                    {/*This grid items contains the back to top button in the footer*/}
                    <Grid item xs={12} sm={4}>
                        <Box>

                            <Link href="#" color="inherit">Back to top</Link>

                        </Box>
                    </Grid>

                </Grid>

            {/* Contains the Copyright message at the end of the footer */}
            <Box textAlign="center"
                 pt={{xs:2, sm:2}}
                 pb={{xs:2, sm:2}}
            >
                <b >Shiba Bakery</b> &reg; {new Date().getFullYear()}
            </Box>


            </Container>
        </Box>
    </footer>
}