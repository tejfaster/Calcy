import { View, Text, StyleSheet, Platform, TouchableOpacity, FlatList, Dimensions } from 'react-native'
import { useState } from 'react'
const num = [{ "id": "7" }, { "id": "8" }, { "id": "9" }, { "id": "4" }, { "id": "5" }, { "id": "6" }, { "id": "1" }, { "id": "2" }, { "id": "3" }, { "id": "0" }, { "id": "." }]
const art = [{ "id": "1", "key": "÷" }, { "id": "2", "key": "×" }, { "id": "3", "key": "%" }, { "id": "4", "key": "-" }, { "id": "5", "key": "+" }, { "id": "6", "key": "=" }]

const Home = () => { 
    const dwidth = ((Dimensions.get("window").width) / 100) * 10
    const [display,setDisplay] = useState(true)
    const [value, setValue] = useState("")
    const [worker,setWorker]= useState("")
    const [num1,setNum1] = useState(0)
    let result = 0

    const numpad = (data) => {
        setDisplay(false)  
        setValue(value + data)
    }
    const work = (data) => {
        if(worker !== ""){
            setWorker("")
            result = num1 + parseFloat(value)          
            setValue(result)
            setNum1(result)            
        }else{
            setDisplay(true)
            setValue("")
            setWorker(data)
            setNum1(parseFloat(value))
        }            
    }
    

    return (
        <View style={styles.container}>
            <View style={styles.screenContainer}>
                <Text style={styles.screen}>{display === true ? 0:value}</Text>
            </View>
            <Text style={styles.screen}>{worker}</Text>
            <View style={styles.func}>
                <Btn val="Check" style={{
                    width: dwidth * 2.8,
                    backgroundColor: "#89b4de"
                }}
                    styletxt={{
                        fontSize: 20
                    }}
                />
                <Btn val="Auto replay" style={{
                    width: dwidth * 2.8,
                    backgroundColor: "#89b4de"
                }}
                    styletxt={{
                        fontSize: 20
                    }}
                />
                <Btn val="ON/AC" style={{
                    width: dwidth * 3.73,
                    backgroundColor: "#5edaec"
                }}
                    styletxt={{
                        fontSize: 20
                    }}
                />
            </View>

            <View style={styles.keymap}>
                <View style={styles.board}>
                    <FlatList
                        data={num}
                        numColumns={3}
                        keyExtractor={item => item.id}
                        renderItem={item => {
                            return (
                                <Btn val={item.item.id}
                                    style={{
                                        width: item.item.id === "0" ? dwidth * 3.7 : dwidth * 1.8,
                                    }}
                                    onPress={() => numpad(item.item.id)}
                                />
                            )
                        }}
                    />
                </View>
                <View style={styles.board}>
                    <FlatList
                        data={art}
                        numColumns={2}
                        keyExtractor={item => item.id}
                        renderItem={item => {
                            return (
                                <Btn val={item.item.key} 
                                onPress={()=>work(item.item.key)}
                                style={{
                                    height: item.item.id == "5" || item.item.id === "6" ? 144 : 70,
                                    width: item.item.id === "0" ? dwidth * 3.7 : dwidth * 1.8
                                }} />
                            )
                        }}
                    />
                </View>
            </View>
        </View>
    )
}

const Btn = (props) => {
    return (
        <TouchableOpacity style={[styles.btn, props.style]} onPress={props.onPress}>
            <Text style={[styles.btntxt, props.styletxt]}>{props.val}</Text>
        </TouchableOpacity>
    )

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#34323f",
        flex: 1,
        paddingTop: Platform.OS === "ios" ? 30 : 10,
        paddingHorizontal: 10
    },
    screenContainer: {
        backgroundColor: "#637172",
        width: "100%",
        height: "11%",
        alignItems: "flex-end",
        justifyContent: "flex-end",
        paddingRight: 10,
        paddingBottom: 5,
        borderWidth: 2,
        borderColor: "#e3e2e7",
        borderRadius: 10
    },
    screen: {
        fontSize: Platform.OS === "ios"?58:60,
        color: "black"
    },
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
    board: {
        borderWidth: 2
    },
    keymap: {
        flexDirection: "row",
        position: "absolute",
        bottom: 15,
        left: 5,
    },
    func: {
        position: "absolute",
        bottom: 320,
        left: 5,
        borderWidth: 2,
        flexDirection: "row",
    }
})

export default Home