import {Text,TouchableOpacity,StyleSheet } from 'react-native'

const Btn = (props) => {
    return (
        <TouchableOpacity style={[styles.btn, props.style]} onPress={props.onPress}>
            <Text style={[styles.btntxt, props.styletxt]}>{props.val}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    btn: {
        height: 70,
        width: 100,
        borderRadius: 2,
        backgroundColor: "black",
        paddingTop: 2,
        paddingLeft: 10,
        margin: 2
    },
    btntxt: {
        color: "white",
        fontSize: 35,
    },
})
export default Btn