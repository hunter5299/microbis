bluetooth.onBluetoothConnected(function () {
    basic.showIcon(IconNames.Asleep)
    robotbit.GeekServo(robotbit.Servos.S1, 225)
    basic.pause(2000)
    robotbit.GeekServo(robotbit.Servos.S1, 7)
})
bluetooth.onBluetoothDisconnected(function () {
    basic.showIcon(IconNames.SmallDiamond)
})
control.onEvent(EventBusSource.MES_DPAD_CONTROLLER_ID, EventBusValue.MICROBIT_EVT_ANY, function () {
    if (control.eventValue() == EventBusValue.MES_DPAD_BUTTON_A_UP || control.eventValue() == EventBusValue.MES_DPAD_BUTTON_B_UP || (control.eventValue() == EventBusValue.MES_DPAD_BUTTON_C_UP || control.eventValue() == EventBusValue.MES_DPAD_BUTTON_D_UP)) {
        robotbit.GeekServo(robotbit.Servos.S3, 96)
        robotbit.GeekServo(robotbit.Servos.S4, 98)
    }
    if (control.eventValue() == EventBusValue.MES_DPAD_BUTTON_1_DOWN) {
        robotbit.GeekServo(robotbit.Servos.S1, 4)
        robotbit.GeekServo(robotbit.Servos.S2, -1)
    }
    if (control.eventValue() == EventBusValue.MES_DPAD_BUTTON_1_UP) {
        robotbit.GeekServo(robotbit.Servos.S1, 225)
        robotbit.GeekServo(robotbit.Servos.S2, 225)
    }
    if (control.eventValue() == EventBusValue.MES_DPAD_BUTTON_A_DOWN) {
        robotbit.GeekServo(robotbit.Servos.S3, 225)
        robotbit.GeekServo(robotbit.Servos.S4, -45)
    }
    if (control.eventValue() == EventBusValue.MES_DPAD_BUTTON_B_DOWN) {
        robotbit.GeekServo(robotbit.Servos.S3, -45)
        robotbit.GeekServo(robotbit.Servos.S4, 225)
    }
    if (control.eventValue() == EventBusValue.MES_DPAD_BUTTON_C_DOWN) {
        robotbit.GeekServo(robotbit.Servos.S3, 225)
        robotbit.GeekServo(robotbit.Servos.S4, 225)
    }
    if (control.eventValue() == EventBusValue.MES_DPAD_BUTTON_D_DOWN) {
        robotbit.GeekServo(robotbit.Servos.S3, -45)
        robotbit.GeekServo(robotbit.Servos.S4, -45)
    }
})
// 读取一行数据（以逗号分隔）
bluetooth.onUartDataReceived(serial.delimiters(Delimiters.Comma), function () {
    receivedData = bluetooth.uartReadUntil(serial.delimiters(Delimiters.Comma))
    serial.writeLine("Got: " + receivedData + "\n")
    if (receivedData == "hold") {
        control.raiseEvent(
        EventBusSource.MES_DPAD_CONTROLLER_ID,
        EventBusValue.MES_DPAD_BUTTON_1_DOWN
        )
    } else if (receivedData == "down") {
        control.raiseEvent(
        EventBusSource.MES_DPAD_CONTROLLER_ID,
        EventBusValue.MES_DPAD_BUTTON_1_UP
        )
    } else if (receivedData == "forward") {
        control.raiseEvent(
        EventBusSource.MES_DPAD_CONTROLLER_ID,
        EventBusValue.MES_DPAD_BUTTON_A_DOWN
        )
    } else if (receivedData == "backward") {
        control.raiseEvent(
        EventBusSource.MES_DPAD_CONTROLLER_ID,
        EventBusValue.MES_DPAD_BUTTON_B_DOWN
        )
    } else if (receivedData == "left") {
        control.raiseEvent(
        EventBusSource.MES_DPAD_CONTROLLER_ID,
        EventBusValue.MES_DPAD_BUTTON_C_DOWN
        )
    } else if (receivedData == "right") {
        control.raiseEvent(
        EventBusSource.MES_DPAD_CONTROLLER_ID,
        EventBusValue.MES_DPAD_BUTTON_D_DOWN
        )
    } else {
        control.raiseEvent(
        EventBusSource.MES_DPAD_CONTROLLER_ID,
        EventBusValue.MES_DPAD_BUTTON_A_UP
        )
    }
})
let receivedData = ""
basic.showIcon(IconNames.Square)
