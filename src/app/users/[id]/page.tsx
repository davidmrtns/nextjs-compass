import { getUser } from "@/services/user.service";
import { Avatar, Box, Card, CardActions, CardContent, CardHeader, IconButton, List, ListItem, ListItemText, Typography } from "@mui/material";
import BadgeIcon from '@mui/icons-material/Badge';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default async function UserPage({ params }: { 
    params: { [key: string]: string | string[] | undefined };
}) {
    params = await params;
    const id = parseInt(params.id as string) || 0;
    
    const user = await getUser(id);
    
    if (!user) {
        return (
            <Box className="container mx-auto p-4">
                <h1 className="text-3xl font-bold underline pb-4">User not found...</h1>
            </Box>
        );
    }

    return (
        <Box className="container mx-auto p-4">
            <h1 className="text-3xl font-bold underline pb-4">User details</h1>
            <Card sx={{ maxWidth: 345 }}>
                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: "red" }} aria-label="user">
                            {user.name.charAt(0).toUpperCase()}
                        </Avatar>
                    }
                    title={user.name}
                    subheader={user.email}
                />
                <CardContent sx={{ paddingTop: 0, paddingBottom: '0 !important' }}>
                    <List>
                        <ListItem sx={{ padding: 0, display: "flex", gap: 2 }}>
                            <BadgeIcon />
                            <ListItemText primary={user.role} secondary="Role" />
                        </ListItem>
                        <ListItem sx={{ padding: 0, display: "flex", gap: 2 }}>
                            <PermContactCalendarIcon />
                            <ListItemText 
                                primary={user.created_at ? new Date(user.created_at).toLocaleString() : "N/A"}
                                secondary="Created at"
                            />
                        </ListItem>
                        <ListItem sx={{ padding: 0, display: "flex", gap: 2 }}>
                            <EditCalendarIcon />
                            <ListItemText
                                primary={user.updated_at ? new Date(user.updated_at).toLocaleString() : "N/A"}
                                secondary="Updated at"
                            />
                        </ListItem>
                    </List>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton aria-label="edit">
                        <EditIcon />
                    </IconButton>
                    <IconButton aria-label="delete" color="error">
                        <DeleteIcon />
                    </IconButton>
                </CardActions>
            </Card>
        </Box>
    );
}