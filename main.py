def on_bluetooth_connected():
    basic.show_icon(IconNames.ASLEEP)
    robotbit.geek_servo(robotbit.Servos.S1, 225)
    basic.pause(2000)
    robotbit.geek_servo(robotbit.Servos.S1, 7)
bluetooth.on_bluetooth_connected(on_bluetooth_connected)

def on_bluetooth_disconnected():
    basic.show_icon(IconNames.SMALL_DIAMOND)
bluetooth.on_bluetooth_disconnected(on_bluetooth_disconnected)

def on_mes_dpad_controller_id_microbit_evt():
    if control.event_value() == EventBusValue.MES_DPAD_BUTTON_A_UP or control.event_value() == EventBusValue.MES_DPAD_BUTTON_B_UP or (control.event_value() == EventBusValue.MES_DPAD_BUTTON_C_UP or control.event_value() == EventBusValue.MES_DPAD_BUTTON_D_UP):
        robotbit.geek_servo(robotbit.Servos.S3, 96)
        robotbit.geek_servo(robotbit.Servos.S4, 98)
    if control.event_value() == EventBusValue.MES_DPAD_BUTTON_1_DOWN:
        robotbit.geek_servo(robotbit.Servos.S1, 4)
        robotbit.geek_servo(robotbit.Servos.S2, -1)
    if control.event_value() == EventBusValue.MES_DPAD_BUTTON_1_UP:
        robotbit.geek_servo(robotbit.Servos.S1, 225)
        robotbit.geek_servo(robotbit.Servos.S2, 225)
    if control.event_value() == EventBusValue.MES_DPAD_BUTTON_A_DOWN:
        robotbit.geek_servo(robotbit.Servos.S3, 225)
        robotbit.geek_servo(robotbit.Servos.S4, -45)
    if control.event_value() == EventBusValue.MES_DPAD_BUTTON_B_DOWN:
        robotbit.geek_servo(robotbit.Servos.S3, -45)
        robotbit.geek_servo(robotbit.Servos.S4, 225)
    if control.event_value() == EventBusValue.MES_DPAD_BUTTON_C_DOWN:
        robotbit.geek_servo(robotbit.Servos.S3, 225)
        robotbit.geek_servo(robotbit.Servos.S4, 225)
    if control.event_value() == EventBusValue.MES_DPAD_BUTTON_D_DOWN:
        robotbit.geek_servo(robotbit.Servos.S3, -45)
        robotbit.geek_servo(robotbit.Servos.S4, -45)
control.on_event(EventBusSource.MES_DPAD_CONTROLLER_ID,
    EventBusValue.MICROBIT_EVT_ANY,
    on_mes_dpad_controller_id_microbit_evt)

# 读取一行数据（以逗号分隔）

def on_uart_data_received():
    global receivedData
    receivedData = bluetooth.uart_read_until(serial.delimiters(Delimiters.COLON))
    bluetooth.uart_write_string("Got: " + receivedData + "\n")
    serial.write_line("Got: " + receivedData + "\n")
    control.raise_event(EventBusSource.MES_DPAD_CONTROLLER_ID,
        EventBusValue.MES_DPAD_BUTTON_1_DOWN)
    basic.pause(2000)
    control.raise_event(EventBusSource.MES_DPAD_CONTROLLER_ID,
        EventBusValue.MES_DPAD_BUTTON_1_UP)
    if receivedData == "1,:":
        robotbit.geek_servo(robotbit.Servos.S1, 225)
        bluetooth.uart_write_string("Action: Servo to 225\n")
    elif receivedData == "0,":
        robotbit.geek_servo(robotbit.Servos.S1, 8)
        bluetooth.uart_write_string("Action: Servo to 8\n")
    else:
        # 如果收到的是其他数据，可以不做任何事，或者给出提示
        bluetooth.uart_write_line("Unknown command.\n")
bluetooth.on_uart_data_received(serial.delimiters(Delimiters.COMMA), on_uart_data_received)

receivedData = ""
basic.show_icon(IconNames.SQUARE)

def on_forever():
    basic.pause(1000)
    bluetooth.uart_write_line("nnn")
basic.forever(on_forever)

def on_forever2():
    pass
basic.forever(on_forever2)
