import { ALERT_TYPE, Dialog, Toast } from 'react-native-alert-notification';


export function AlertBug(body) {

    const alertBug = Dialog.show({
      type: ALERT_TYPE.DANGER,
      title: 'Error!',
      textBody: body,
      autoClose: true,
      button: 'CERRAR',
      onPressButton: () => { 
        Dialog.hide()
      }
    })
    return (alertBug)
}

export function AlertWarring(body) {
  const alertSimpleBug = Dialog.show({
    type: ALERT_TYPE.WARNING,
    autoClose: true,
    title: 'Error!',
    textBody: body,
    button: 'CERRAR'
  })
  return (alertSimpleBug)
}

export function AlertSuccess(body, location, navigation) {

  const alertSuccess = Dialog.show({
      type: ALERT_TYPE.SUCCESS,
      title: 'Exitoso',
      textBody: body,
      button: 'CERRAR',
      onPressButton: () => { 
        location == null ? '' : navigation.navigate(location)
        Dialog.hide()
      }
    })
    return (alertSuccess)
}


export function AlertSimpleDanger(body) {
  const alertSimpleBug = Dialog.show({
    type: ALERT_TYPE.WARNING,
    autoClose: true,
    title: 'Hola capitán AQKU',
    textBody: body,
    button: 'CERRAR'
  })
  return (alertSimpleBug)
}

export function AlertSimpleBug(body) {
  const alertSimpleBug = Toast.show({
    type: ALERT_TYPE.DANGER,
    autoClose: true,
    title: 'Error',
    textBody: body,
    button: 'CERRAR'
  })
  return (alertSimpleBug)
}

export function AlertSimpleSuccess(body) {

  const alertSimpleSuccess = Toast.show({
    type: ALERT_TYPE.SUCCESS,
    title: 'Exitoso',
    textBody: body,
    button: 'CERRAR',
    onPressButton: () => { 
      Dialog.hide();
    }
  })
    return (alertSimpleSuccess)
}