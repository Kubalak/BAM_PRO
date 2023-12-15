import {AntDesign, FontAwesome, FontAwesome5, Entypo, Feather, Fontisto, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

export default function DisplayIcon ({iconString, size = 32, color = "green"}) {
    if(iconString === undefined || iconString === null)
        return <></>
    
    const ico = (iconString.constructor === "str".constructor) ? JSON.parse(iconString) : iconString;

    if(ico.type === "fa") 
        return <FontAwesome name={ico.name} size={size} color={color}/>
    if(ico.type === "fa5") 
        return <FontAwesome5 name={ico.name} size={size} color={color}/>
    if(ico.type === "ad")
        return <AntDesign name={ico.name} size={size} color={color}/>
    if(ico.type === "mc")
        return <MaterialCommunityIcons name={ico.name} size={size} color={color}/>
    if(ico.type === "mi")
        return <MaterialIcons name={ico.name} size={size} color={color}/>
    if(ico.type === "fi")
        return <Fontisto name={ico.name} size={size} color={color}/>
    return <></>
};

export const icons = [
    {label:"Default", value:'{"type": "fa", "name": "globe"}'},
    {label:"Facebook", value:'{"type": "ad", "name":"facebook-square"}'},
    {label:"X", value:'{"type": "ad", "name":"twitter"}'},
    {label:"LinkedIn", value:'{"type": "fa", "name":"linkedin"}'},
    {label:"Github", value:'{"type": "fa", "name":"github"}'},
    {label:"Amazon", value:'{"type": "fa", "name":"amazon"}'},
    {label:"Google", value:'{"type": "fa", "name":"google"}'},
    {label:"Steam", value:'{"type": "fa", "name":"steam"}'},
    {label:"Teams", value:'{"type": "mc", "name":"microsoft-teams"}'},
    {label:"Microsoft", value:'{"type": "mc", "name":"microsoft"}'},
    {label:"Email", value:'{"type": "mi", "name":"email"}'},
    {label:"Stack Overflow", value:'{"type": "fa", "name":"stack-overflow"}'},
    {label:"Oracle", value:'{"type": "fi", "name":"oracle"}'},
    {label:"Minecraft", value:'{"type": "mc", "name":"minecraft"}'},
    {label:"Uplay", value: '{"type": "mc", "name":"ubisoft"}'},
    {label:"Discord", value: '{"type": "mc", "name":"discord"}'},
    {label:"Telegram", value:'{"type": "fa5", "name":"telegram-plane"}'},
    {label:"Slack", value:'{"type": "fa5", "name":"slack"}'},
    {label:"Bank", value:'{"type": "mc", "name":"bank"}'}
];
