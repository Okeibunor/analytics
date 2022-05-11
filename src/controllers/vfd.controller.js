const axios = require('axios')
const dayjs = require('dayjs')

axios.defaults.headers.common['Authorization'] = `Bearer ${process.env.VFD_SECRET_KEY}`;

const getSingleTransaction = async (req, res, next) => {
    try {
        const transactionId  = req.params.id

        if (!transactionId) {
            return res.status(400).json({
                msg: 'transactions Id param is required'
            })
        }
        const baseUrl = process.env.VFD_API
        const walletCredentials = process.env.VFD_CREDENTIALS

        let data = await axios.get(
            `${baseUrl}wallet2/transactions`, {
                params: {
                    "reference": transactionId,
                    "wallet-credentials": walletCredentials
                },
            }
        )
        data = data.data
        return res.status(200).json({
            status: true,
            message: "successfully retrieved vfd transaction",
            data: { transactionStatus: data.status, status: formatStatus(data.status), ...data.data}
        })
    } catch (error) {
        console.log('get single transaction error >>', error)
        return res.status(400).json({
            status: false,
            message: 'Count not retrieve transactions',
        })
    }
}

const formatDate = (date) => {
    return dayjs(date).format('MM-DD-YYYY')
}

const formatTransactions = (data, status) => {
    return data.map((dt)=>{
        return {
            id: dt.id,
            statusCode: status,
            status: formatStatus(status),
            amount: dt.amount,
            accountId: dt.accountId,
            accountNumber: dt.accountNo,
            note: dt.note,
            amount: `${dt.currency.code} ${dt.amount}`,
            currency: dt.currency.code,
            reversedByContraEntry: dt.reversedByContraEntry, 
            submittedOnDate: formatDate(dt.submittedOnDate),
            runningBalance: `${dt.currency.code} ${dt.runningBalance}`,
            reversed: dt.reversed,
            chargesPaidByData: dt.chargesPaidByData,
            paymentDetails: {...dt.paymentDetailData, paymentType: dt.paymentDetailData.paymentType.name},
            date: formatDate(dt.date),
            transactionTime: `${dt.transactionTime[0]}:${dt.transactionTime[1]}:${dt.transactionTime[2]}`,
        }
    })
}

const formatStatus = (status) => {
    switch(status) {
        case "00":
          return "SUCCESSFUL";
        case "01":
          return "PENDING";
        case "02":
          return "PENDING";
        case "03":
          return "FAILED";
        case "05": 
          return "FAILED";
        case "06":
            return "FAILED"
        case "07":
            return "FAILED"
        case "08":
            return "FAILED"
        case "09":
            return "PENDING"
        case "12":
            return "FAILED"
        case "13":
            return "FAILED"
        case "14":
             return "FAILED"
        case "15":
            return "FAILED"
        case "16":
            return "FAILED"
        default:
            return "INVALID CODE"
      }
}

const getAllTransactions = async (req, res) => {
    try {
        const baseUrl = process.env.VFD_API
        const consumerSecret = process.env.VFD_SECRET_KEY
        const walletCredentials = process.env.VFD_CREDENTIALS

        const { data } = await axios.get(
            `${baseUrl}wallet2/account/transactions?wallet-credentials=${walletCredentials}`,
                {
                    headers: {
                        Authorization: `Bearer ${consumerSecret}`,
                    },
                }
            )
        return res.status(200).json({
                status: true,
                message: "successfully retrieved vfd transactions",
                data: formatTransactions(data.data, data.status)
            }
        )
    } catch (error) {
        console.log('vfd get transactions error >>', error)
        return res.status(400).json({
            status: false,
            message: 'Count not retrieve transactions',
        })
    }
}
exports.getSingleTransaction = getSingleTransaction;
exports.getAllTransactions = getAllTransactions;