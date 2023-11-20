import { useState, useEffect, useCallback } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Datepicker from 'react-mobile-datepicker'

const maritalStatus = ['Belum Kawin', 'Kawin', 'Cerai']
const occupationList = [
  'Pegawai Negeri',
  'TNI/Polisi',
  'Pegawai Swasta Formal',
  'Pegawai Swasta Non Formal',
  'Wiraswasta Formal',
  'Wiraswasta Non Formal',
  'Professional',
]

const formPages = ['nik', 'domicile', 'occupation', 'installment']
const monthMap = {
  1: 'Januari',
  2: 'Februari',
  3: 'Maret',
  4: 'April',
  5: 'Mei',
  6: 'Juni',
  7: 'Juli',
  8: 'Agustus',
  9: 'September',
  10: 'Oktober',
  11: 'November',
  12: 'Desember',
}
const dateConfig = {
  date: {
    format: 'DD',
    caption: 'Tanggal',
    step: 1,
  },
  month: {
    format: (value) => monthMap[value.getMonth() + 1],
    caption: 'Bulan',
    step: 1,
  },
  year: {
    format: 'YYYY',
    caption: 'Tahun',
    step: 1,
  },
}



function App() {
  const [count, setCount] = useState(0)
  const [isQueried, setIsQueried] = useState(false)
  const [isPhoneQueried, setIsPhoneQueried] = useState(false)
  const [fields, setFields] = useState({
    ktp_dob: '992---1-'
  })
  const [openBirthDateSheet, setOpenBirthDateSheet] = useState(true)

  const formatDate = (date) => {
    const d = new Date(date)
    let month = '' + (d.getMonth() + 1)
    let day = '' + d.getDate()
    const year = d.getFullYear()

    if (month.length < 2) month = '0' + month
    if (day.length < 2) day = '0' + day

    return [year, month, day].join('-')
  }

  // const getDraft = useCallback((onSuccess = () => {}) => {
  //   const historyState = history.location.state
  //   let objCredit = {}
  //   if (historyState && historyState.productDetail) {
  //     objCredit = {
  //       obj_credit_brand: historyState.productDetail.brand_label,
  //       obj_credit_type: historyState.productDetail.type,
  //       obj_credit_model: historyState.productDetail.label,
  //       obj_credit_year: 'new',
  //       obj_credit_color: historyState.colorVariantSelected.label,
  //       obj_credit_otr: historyState.locationSelected.price,
  //       obj_credit_dp: historyState.dpSelected,
  //       obj_credit_tenor: historyState.tenorSelected.tenor,
  //       obj_credit_installment: historyState.tenorSelected.amount,
  //       obj_path: historyState.productDetail.assets,
  //       obj_location: historyState.locationSelected.label,
  //     }
  //   }

  //   fetchWrapper
  //     .post(
  //       '/get-draft',
  //       {
  //         ...objCredit,
  //         app,
  //       },
  //       history
  //     )
  //     .then((response) => {
  //       if (response.status === 'ok') {
  //         const result = {
  //           ...fields,
  //           ...response.data,
  //         }
  //         const handleFifthStep = result.form_page > formPages.length ? formPages.length : result.form_page
  //         setFields(result)
  //         setIsQueried(result.did_get_data360 && !!result.ktp_id)
  //         setIsPhoneQueried(result.did_get_data360 && !!result.cust_hp_no)
  //       } else {
  //         throw response
  //       }
  //     })
  //     .catch((response) => {
  //       logger.error('getDraft', response, history)
  //       handleError(response)
  //     })
  //     .finally(() => {
  //       setShowBottomArea(true)
  //     })
  // }, [])

  // useEffect(() => {
  //   getDraft()
  // }, [])


  const handleSelect = async (dateInput) => {
    const dateValue = new Date(dateInput)
    await setFields({ ...fields, ktp_dob: formatDate(dateValue) })
    await setOpenBirthDateSheet(false)
  }

  const handleCancel = async (e, data) => {
    await setOpenBirthDateSheet(false)
  }


  function Component() {
    // const selectedMaritalStatus = {
    //   description: fields.ktp_marital_status,
    //   id: maritalStatus.indexOf(fields.ktp_marital_status),
    // }
    // const isKTPDisabled = isQueried && !!fields.ktp_id
    // const isPhoneDisabled = isPhoneQueried && !!fields.cust_hp_no
    const dob = fields.ktp_dob ? new Date(fields.ktp_dob) : ''
    const formattedDate = dob ? dob.getDate() + ' ' + monthMap[dob.getMonth() + 1] + ' ' + dob.getFullYear() : ''
    const dobForDatePicker = new Date(fields.ktp_dob || '1970-01-01')
  
    return (
      <>
        <div className="navigation">
          <span className="active">1 dari 4</span>
        </div>
        <div>
          <div>Sesuai E-KTP kamu</div>
          <div className="form-subtitle">Cek dan pastikan lagi semua data di bawah udah benar ya.</div>
          {/* <TextBox
            labelText="Tanggal Lahir"
            readonly={true}
            placeholder="Tanggal Lahir"
            keyText="ktp_dob"
            value={formattedDate}
            {...commonTextAttributes}
            onClick={() => setOpenBirthDateSheet(true)}
          /> */}
          <div>
            <div>
              Tanggal Lahir
            </div>
            <div>
              {formattedDate}
            </div>
          </div>
          <Datepicker
            value={dobForDatePicker}
            isOpen={openBirthDateSheet}
            onSelect={handleSelect}
            onCancel={handleCancel}
            min={new Date(1900, 1, 1)}
            confirmText="Simpan"
            cancelText="Kembali"
            dateConfig={dateConfig}
            headerFormat={'DD-MMM-YYYY'}
          />
          <div className="ravier-text-box" key="textBox-ktp_gender">
            <label className="ravier-text-box__label">Jenis Kelamin</label>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <div>
        <Component />
      </div>
    </>
  )
}

export default App
