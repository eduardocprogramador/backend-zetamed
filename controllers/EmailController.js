const sendEmail = require('../utils/sendEmail')

class EmailController {
    static async sendReferralGuide(req, res) {
        const { website, startedAt, ...form } = req.body
        if (website) {
            return res.status(400).json({
                message: 'Requisição inválida'
            })
        }
        const minMs = 2000
        if (!startedAt || Date.now() - Number(startedAt) < minMs) {
            return res.status(400).json({
                message: 'Form enviado rápido demais'
            })
        }
        const examesHtml = form.selectedExams
            .map(exam => `<li>${exam}</li>`)
            .join('')
        const mailOptions = {
            from: `Zetamed Site <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_USER,
            subject: "Guia de Encaminhamento",
            html: `
            <strong>CNPJ:</strong> ${form.cnpj}<br>
            <strong>Razão Social:</strong> ${form.name}<br>
            <strong>Data do Exame:</strong> ${form.examDate}<br>
            <strong>Turno:</strong> ${form.shift}<br>
            <hr>
            <strong>Nome do Funcionário:</strong> ${form.employeeName}<br>
            <strong>Data de Nascimento:</strong> ${form.birthDate}<br>
            <strong>Data de Admissão:</strong> ${form.admissionDate}<br>
            <strong>CPF:</strong> ${form.cpf}<br>
            <strong>Sexo:</strong> ${form.gender}<br>
            <strong>Telefone:</strong> ${form.phone}<br>
            <strong>Email:</strong> ${form.email}<br>
            <strong>Setor:</strong> ${form.sector}<br>
            <strong>Função:</strong> ${form.position}<br>
            <strong>Tipo de Exame:</strong> ${form.examType}<br>
            <strong>Exames Complementares:</strong>
            <ul>${examesHtml}</ul>
            <strong>Observação:</strong> ${form.obs}
            `,
        }
        try {
            await sendEmail(mailOptions)
            res.status(200).json({
                message: "E-mail enviado!"
            })
        } catch (error) {
            console.error(error)
            res.status(500).json({
                message: 'Erro ao enviar o email'
            })
        }
    }
    static async sendRequestQuote(req, res) {
        const { website, startedAt, ...form } = req.body
        if (website) {
            return res.status(400).json({
                message: 'Requisição inválida'
            })
        }
        const minMs = 2000
        if (!startedAt || Date.now() - Number(startedAt) < minMs) {
            return res.status(400).json({
                message: 'Form enviado rápido demais'
            })
        }
        const mailOptions = {
            from: `Zetamed Site <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_USER,
            subject: "Solicitação de Orçamento",
            html: `
            <strong>CNPJ:</strong> ${form.cnpj}<br>
            <strong>Razão Social:</strong> ${form.socialReason}<br>
            <strong>Quantidade de Funcionários:</strong> ${form.qtyEmployees}<br>
            <strong>Número de Cargos/Funções:</strong> ${form.numPositions}<br>
            <strong>Ramo da Empresa:</strong> ${form.branch}<br>
            <strong>Cidade e Estado:</strong> ${form.cityAndState}<br>
            <hr>
            <strong>Solicitante</strong><br>
            <strong>Nome:</strong> ${form.name}<br>
            <strong>Email:</strong> ${form.email}<br>
            <strong>Cargo/Função:</strong> ${form.position}<br>
            <strong>Telefone:</strong> ${form.phone}
            `,
        }
        try {
            await sendEmail(mailOptions)
            res.status(200).json({
                message: "E-mail enviado!"
            })
        } catch (error) {
            console.error(error)
            res.status(500).json({
                message: 'Erro ao enviar o email'
            })
        }
    }
}

module.exports = EmailController