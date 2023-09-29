import { View, Text, StyleSheet,SafeAreaView, Platform, FlatList} from 'react-native'
import { useState } from 'react'
import { digital_7 } from "../constant/font"
import { art, dheight, dwidth, num } from '../constant/constant'
import Btn from '../components/Btn'

const Home = () => {
    const [value, setValue] = useState("")
    const [worker, setWorker] = useState("")
    const [valen, setValen] = useState([])
    const [count, setCount] = useState(0);
    const [chkcount, setChkCount] = useState(-1);
    const [display, setDisplay] = useState(false)
    const [result, setResult] = useState(0)

    const reset = () => {
        setValue("")
        setWorker("")
        setValen([])
        setCount(0)
        setResult(0)
        setChkCount(-1)
        setDisplay(false)
    }

    const back = () => {
        if (value.length > 0) {
            setValue(value.slice(0, value.length - 1))
        }

    }
    const check = () => {
        setDisplay(true)
        if (valen.length > chkcount)
            setChkCount(chkcount + 1)
    }

    const numpad = (data) => {
        setValue(value + data)
    }

    const work = (data) => {
        if (value != NaN && value != "" && value != undefined) {
            let val = parseFloat(value)
            if (result === 0) {
                setResult(result + val)
            } else {
                if (worker === "+") {
                    setResult(result + val)
                } else if (worker === "-") {
                    setResult(result - val)
                } else if (worker === "×") {
                    setResult(result * val)
                } else if (worker === "÷") {
                    setResult(result / val)
                } else if (worker === "%") {
                    setResult((result / 100) * val)
                }
            }
            setValen([...valen, { "id": count, "key": val, "type": data }])
            setCount(count + 1)
            setValue("")
        }
        setWorker(data)
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.screenContainer}>
                {
                    display === true ? <Text  style={styles.screen}>{valen.filter(item => item.id == chkcount)[0]?.key}</Text>
                        : <Text numberOfLines={2} style={styles.screen}>{value === "" ? result : value}</Text>
                }
            </View>
            <View style={{position:"absolute",left:25,top:11}}>
                {
                    display === true ?
                        <Text style={[styles.screen, { fontSize: 30 }]}>{chkcount}</Text>
                        : <Text style={[styles.screen, { fontSize: 30 }]}>{count}</Text>
                }
            </View>
            <Text style={styles.screen}>{worker}</Text>
            <View style={[styles.func, { bottom: Platform.OS === "ios" ? 415 : 400 }]}>
                <Btn val="Check" onPress={() => check()}
                    style={{width: dwidth * 2.8,backgroundColor: "#89b4de"}}
                    styletxt={{fontSize: 20}}
                />
                <Btn val="Back" onPress={() => back()}
                    style={{width: dwidth * 2.8,backgroundColor: "#89b4de"}}
                     styletxt={{fontSize: 20}}
                />
                <Btn val="ON/AC" onPress={() => reset()}
                    style={{width: dwidth * 3.73,backgroundColor: "#5edaec"}}
                    styletxt={{fontSize: 20}}
                />
            </View>

            <View style={[styles.keymap, { bottom: Platform.OS === "ios" ? 35 : 20, }]}>
                <View style={styles.board}>
                    <FlatList
                        data={num}
                        numColumns={3}
                        keyExtractor={item => item.id}
                        renderItem={item => {
                            return (
                                <Btn val={item.item.key}
                                    style={{
                                        width: item.item.key === "0" ? dwidth * 3.7 : dwidth * 1.8,
                                    }}
                                    styletxt={{
                                        fontSize: item.item.key === "M+" || item.item.key === "M-" || item.item.key === "MU" ? dwidth * 0.7 : dwidth
                                    }}
                                    onPress={() => item.item.key === "M+" || item.item.key === "M-" || item.item.key === "MU" ? work(item.item.key) : numpad(item.item.key)}
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
                                    onPress={() => work(item.item.key)}
                                    styletxt={{
                                        fontSize: item.item.key === "M=" || item.item.key === "MRC" ? dwidth * 0.7 : dwidth
                                    }}
                                    style={{
                                        height: item.item.key == "+" || item.item.key === "=" ? 144 : 70,
                                        width: item.item.id === "0" ? dwidth * 3.7 : dwidth * 1.8
                                    }} />
                            )
                        }}
                    />
                </View>
            </View>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: "#34323f",
        flex: 1,
        paddingTop:10,
        paddingHorizontal: 10
    },
    screenContainer: {
        backgroundColor: "#637172",
        // width: "100%",
        height: dheight * 15,
        alignItems: "flex-end",
        justifyContent: "flex-end",
        paddingRight: 10,
        // paddingBottom: 5,
        borderWidth: 2,
        borderColor: "#e3e2e7",
        borderRadius: 10,
        borderLeftWidth: 5,
        borderRightWidth: 5,
        marginHorizontal:Platform.OS === "ios"?10:0
    },
    screen: {
        fontFamily: digital_7,
        fontSize: dwidth * 1.7,
        color: "black"
    },
    board: {
        borderWidth: 2
    },
    keymap: {
        flexDirection: "row",
        position: "absolute",
        left: 5,
    },
    func: {
        position: "absolute",
        bottom: 400,
        left: 5,
        borderWidth: 2,
        flexDirection: "row",
    }
})

export default Home