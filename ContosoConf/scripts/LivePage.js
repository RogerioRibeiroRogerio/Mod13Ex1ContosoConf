export class LivePage {

    constructor(socket, sectionElement) {
        this.initializeSocket(socket);
        this.initializeUI(sectionElement);
    }

    initializeSocket(socket) {
        this.socket = socket;
        // TODO: Assign a callback to handle messages from the socket.
        this.socket.onmessage = this.handleSocketMessage.bind(this);

    }

    initializeUI(sectionElement) {
        this.questionListElement = sectionElement.querySelector("ul");
        this.questionInput = sectionElement.querySelector("input");

        const form = sectionElement.querySelector("form");
        form.addEventListener("click", this.handleFormSubmit.bind(this), false);

        this.questionListElement.addEventListener("click", this.handleQuestionsClick.bind(this), false);
    }

    handleFormSubmit(event) {
        // Prevent the form actually submitting.
        event.preventDefault();

        const text = this.questionInput.value;
        if (text) {
            this.askQuestion(text);
        }
    }

    askQuestion(text) {
        // TODO: Create a message object with the format { ask: text }

        // TODO: Convert the message object into a JSON string

        // TODO: Send the message to the socket

        // Clear the input ready for another question.
        this.questionInput.value = "";
    }

    handleSocketMessage(event) {
        // TODO: Parse the event data into message object.
        // const message = ... ;
        const message = JSON.parse(event.data);


        // TODO: Check if message has a `questions` property, before calling handleQuestionsMessage
        if (message.questions) {
            this.handleQuestionsMessage(message);
        }
    }

    handleQuestionsMessage(message) {
        // message has the form:
        //   { questions: [
        //         { text: "...", id: 1 },
        //         { text: "...", id: 2 }
        //   ] }

        // TODO: Display each question in the page, using the displayQuestion function.
        message.questions.forEach(this.displayQuestion, this);


    }

    handleRemoveMessage(message) {
        const listItems = this.questionListElement.querySelectorAll("li");
        for (let i = 0; i < listItems.length; i++) {
            if (listItems[i].questionId === message.remove) {
                this.questionListElement.removeChild(listItems[i]);
                break;
            }
        }
    }

    displayQuestion(question) {
        const item = this.createQuestionItem(question);
        //item.appendChild(this.createReportLink());
        this.questionListElement.appendChild(item);
    }

    createQuestionItem(question) {
        const item = document.createElement("li");
        item.textContent = question.text + " ";
        item.questionId = question.id;
        return item;
    }

    createReportLink() {
        const report = document.createElement("a");
        report.textContent = "Report";
        report.setAttribute("href", "#");
        report.setAttribute("class", "report");
        return report;
    }

    handleQuestionsClick(event) {
        event.preventDefault();

        const clickedElement = event.srcElement || event.target;
        if (this.isReportLink(clickedElement)) {
            const questionId = clickedElement.parentNode.questionId;
            this.reportQuestion(questionId);
            clickedElement.textContent = "Reported";
        }
    }

    isReportLink(element) {
        return element.classList && element.classList.contains("report");
    }

    reportQuestion(questionId) {
        // TODO: Send socket message { report: questionId }
    }
}
// SIG // Begin signature block
// SIG // MIIdkAYJKoZIhvcNAQcCoIIdgTCCHX0CAQExCzAJBgUr
// SIG // DgMCGgUAMGcGCisGAQQBgjcCAQSgWTBXMDIGCisGAQQB
// SIG // gjcCAR4wJAIBAQQQEODJBs441BGiowAQS9NQkAIBAAIB
// SIG // AAIBAAIBAAIBADAhMAkGBSsOAwIaBQAEFIjOr96JrVEI
// SIG // d2e/wfClcbZijKDVoIIYbjCCBN4wggPGoAMCAQICEzMA
// SIG // AAD5XMkiVQrAncQAAAAAAPkwDQYJKoZIhvcNAQEFBQAw
// SIG // dzELMAkGA1UEBhMCVVMxEzARBgNVBAgTCldhc2hpbmd0
// SIG // b24xEDAOBgNVBAcTB1JlZG1vbmQxHjAcBgNVBAoTFU1p
// SIG // Y3Jvc29mdCBDb3Jwb3JhdGlvbjEhMB8GA1UEAxMYTWlj
// SIG // cm9zb2Z0IFRpbWUtU3RhbXAgUENBMB4XDTE4MDgyMzIw
// SIG // MjAwOFoXDTE5MTEyMzIwMjAwOFowgc4xCzAJBgNVBAYT
// SIG // AlVTMRMwEQYDVQQIEwpXYXNoaW5ndG9uMRAwDgYDVQQH
// SIG // EwdSZWRtb25kMR4wHAYDVQQKExVNaWNyb3NvZnQgQ29y
// SIG // cG9yYXRpb24xKTAnBgNVBAsTIE1pY3Jvc29mdCBPcGVy
// SIG // YXRpb25zIFB1ZXJ0byBSaWNvMSYwJAYDVQQLEx1UaGFs
// SIG // ZXMgVFNTIEVTTjpGNTI4LTM3NzctOEE3NjElMCMGA1UE
// SIG // AxMcTWljcm9zb2Z0IFRpbWUtU3RhbXAgU2VydmljZTCC
// SIG // ASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAMFC
// SIG // 0ikJQxdAmGrUFjynimanI3GVW7IRZvXI6Q5cb3UVTluN
// SIG // pr8u+lWgzsGEgVMwO3U1EzrNuSRFuuulCjIRbqqUf9nl
// SIG // KX+VzEo0kMls+42d3SR2sN5tPCBoeBV2D0rgIrb3zIy3
// SIG // YXXXFSPN7uPMERunK02PHIALJMrCAnwHp9/oKzpDCjBL
// SIG // GC21yl5eb1H4S3u/t2r88d1wQdZD6vZMLcEcPkT+Y2cC
// SIG // +zWSaMkALTg3XD25sih12Pt6jU/5deVMDmqz9/3Pif0g
// SIG // KrjRtAexZAqZUozQK9oorbeblPAQuQiZjs1MgZqJsdJk
// SIG // 3KFpHhlXDLyha+l0KRG2Vn2bjxo791kCAwEAAaOCAQkw
// SIG // ggEFMB0GA1UdDgQWBBSGWLrn9LXJzd8M+9s5CbSB+9xZ
// SIG // GzAfBgNVHSMEGDAWgBQjNPjZUkZwCu1A+3b7syuwwzWz
// SIG // DzBUBgNVHR8ETTBLMEmgR6BFhkNodHRwOi8vY3JsLm1p
// SIG // Y3Jvc29mdC5jb20vcGtpL2NybC9wcm9kdWN0cy9NaWNy
// SIG // b3NvZnRUaW1lU3RhbXBQQ0EuY3JsMFgGCCsGAQUFBwEB
// SIG // BEwwSjBIBggrBgEFBQcwAoY8aHR0cDovL3d3dy5taWNy
// SIG // b3NvZnQuY29tL3BraS9jZXJ0cy9NaWNyb3NvZnRUaW1l
// SIG // U3RhbXBQQ0EuY3J0MBMGA1UdJQQMMAoGCCsGAQUFBwMI
// SIG // MA0GCSqGSIb3DQEBBQUAA4IBAQBYvhex9vvT+NJo1MHT
// SIG // nbXnYbU1oKGUoqm6M3cO11Hj07JWjEx7P8PXJpmWseTs
// SIG // rux4sI/8+nJQuBjy03W2NBi5EWGPA5BLb8OEqOPQuhQh
// SIG // jRZJRVq87CNibsOFRZfY+DsEhhoE15X5MAp+UVeMGxeY
// SIG // FjXQv2ZW720qdQktc5AqLwUitZVn4Ug1YJ0gIvp35vlx
// SIG // XgH9HoOoeAXLnwajJGZIlzZ07oR5u+xAWvUNRGoowC1K
// SIG // 7c2HZ4bbW2dI0XvJNAEJwwMX6SQoRCAHPKF3mrNh0rlZ
// SIG // lgj8xWD3cb45R3SwYgXLYlGugIplgqIGe11Xcdy2kUDS
// SIG // eOqbZD3+nGb90xwsMIIF/zCCA+egAwIBAgITMwAAAQNe
// SIG // JRyZH6MeuAAAAAABAzANBgkqhkiG9w0BAQsFADB+MQsw
// SIG // CQYDVQQGEwJVUzETMBEGA1UECBMKV2FzaGluZ3RvbjEQ
// SIG // MA4GA1UEBxMHUmVkbW9uZDEeMBwGA1UEChMVTWljcm9z
// SIG // b2Z0IENvcnBvcmF0aW9uMSgwJgYDVQQDEx9NaWNyb3Nv
// SIG // ZnQgQ29kZSBTaWduaW5nIFBDQSAyMDExMB4XDTE4MDcx
// SIG // MjIwMDg0OFoXDTE5MDcyNjIwMDg0OFowdDELMAkGA1UE
// SIG // BhMCVVMxEzARBgNVBAgTCldhc2hpbmd0b24xEDAOBgNV
// SIG // BAcTB1JlZG1vbmQxHjAcBgNVBAoTFU1pY3Jvc29mdCBD
// SIG // b3Jwb3JhdGlvbjEeMBwGA1UEAxMVTWljcm9zb2Z0IENv
// SIG // cnBvcmF0aW9uMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8A
// SIG // MIIBCgKCAQEA0ZR2NuaGqzb+aflGfIuIUMuQcH+wVakk
// SIG // HX455wWfD6x7l7LOcwr71JskXBa1Od0bfjNsEfw7JvOY
// SIG // ql1Ta6rD7BO40u/PV3/MZcuvTS4ysVYrTjQHif5pIb0+
// SIG // RPveEp2Fv3x2hn1ysXabYeaKZExGzrbVOox3k3dnIZy2
// SIG // WgZeR4b1PNEJyg09zbLpoVB40YSI4gE8IvyvlgjMXZnA
// SIG // 7eulWpiS9chATmpzr97jdHrTX0aXvOJnKHeZrMEOMRaP
// SIG // AA8B/kteVA/KxGU/CuOjRtv2LAM6Gb5oBRac5n80v6eH
// SIG // jWU5Jslj1O/F3b0l/v0o9DSGeawq1V8wkTvkFGrrscoE
// SIG // IwIDAQABo4IBfjCCAXowHwYDVR0lBBgwFgYKKwYBBAGC
// SIG // N0wIAQYIKwYBBQUHAwMwHQYDVR0OBBYEFEe+wMvhpj/9
// SIG // ZdY48gNdt69390D/MFAGA1UdEQRJMEekRTBDMSkwJwYD
// SIG // VQQLEyBNaWNyb3NvZnQgT3BlcmF0aW9ucyBQdWVydG8g
// SIG // UmljbzEWMBQGA1UEBRMNMjMwMDEyKzQzNzk2NTAfBgNV
// SIG // HSMEGDAWgBRIbmTlUAXTgqoXNzcitW2oynUClTBUBgNV
// SIG // HR8ETTBLMEmgR6BFhkNodHRwOi8vd3d3Lm1pY3Jvc29m
// SIG // dC5jb20vcGtpb3BzL2NybC9NaWNDb2RTaWdQQ0EyMDEx
// SIG // XzIwMTEtMDctMDguY3JsMGEGCCsGAQUFBwEBBFUwUzBR
// SIG // BggrBgEFBQcwAoZFaHR0cDovL3d3dy5taWNyb3NvZnQu
// SIG // Y29tL3BraW9wcy9jZXJ0cy9NaWNDb2RTaWdQQ0EyMDEx
// SIG // XzIwMTEtMDctMDguY3J0MAwGA1UdEwEB/wQCMAAwDQYJ
// SIG // KoZIhvcNAQELBQADggIBAJ/1yVMNPw0m7KJE2A3Rn2OW
// SIG // Bks/HlzFM6Okw2yvH8ABuutl7J4zEA+nrFvUvZBhF+cx
// SIG // 58MmtKz1J9NIk4aI/hI1kWQi0WstO6gsFZQp0jeW5jX/
// SIG // DM7IBhYWniSx4jn5bg542AwbtilgJ3Y0JJvduZd1ywE7
// SIG // rYISFiKAiRWEu5hQILAXJoZJr859RRVDNJbPgVwYLNST
// SIG // 8mer4nPIPaPN/DIeYBzpsBsw+yy7By6WhJNFKFRczZb9
// SIG // oNuB2LYwykOx80jAskYcXV52Klif1O7y9PpITLVhi7CM
// SIG // QemquJ2Q9P9qQg+5PukO7JT8jYC7eOMjp3hbsm0f+VnB
// SIG // fbbROcl54IMcYAraPbDR7Ta/RQfpGzZu5T07BQOn1Kcl
// SIG // Eo/mdqMTs0VaQzGC2tiErrmwH3X19h19URE3J+i1NYRx
// SIG // 91eqrvqJccmY0p5aZHa+jMN9FWqR8RT08tk1Mbjbcvq0
// SIG // dciIm2q/mEXHZrLX/86SkHXk6+aG0sgb2yfAW5VvSW9Y
// SIG // XWkq3lNL+OjKe/ZsFfkDGQ8RhapPmr+qV91gxvVxIPRR
// SIG // qJrK6dHrNEc9dfoi7FU/ahk5axDpWj+O9CN4MLLypjjL
// SIG // NY2qmFkkQLg6Z6QHX6D+2DtJE/sM4e0LbYNQzvB/PuDZ
// SIG // COiMIUpBwt7rjlvuA8Mdbm7mVDVmZ3J8GupS9iLEcj+u
// SIG // MIIGBzCCA++gAwIBAgIKYRZoNAAAAAAAHDANBgkqhkiG
// SIG // 9w0BAQUFADBfMRMwEQYKCZImiZPyLGQBGRYDY29tMRkw
// SIG // FwYKCZImiZPyLGQBGRYJbWljcm9zb2Z0MS0wKwYDVQQD
// SIG // EyRNaWNyb3NvZnQgUm9vdCBDZXJ0aWZpY2F0ZSBBdXRo
// SIG // b3JpdHkwHhcNMDcwNDAzMTI1MzA5WhcNMjEwNDAzMTMw
// SIG // MzA5WjB3MQswCQYDVQQGEwJVUzETMBEGA1UECBMKV2Fz
// SIG // aGluZ3RvbjEQMA4GA1UEBxMHUmVkbW9uZDEeMBwGA1UE
// SIG // ChMVTWljcm9zb2Z0IENvcnBvcmF0aW9uMSEwHwYDVQQD
// SIG // ExhNaWNyb3NvZnQgVGltZS1TdGFtcCBQQ0EwggEiMA0G
// SIG // CSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCfoWyx39tI
// SIG // kip8ay4Z4b3i48WZUSNQrc7dGE4kD+7Rp9FMrXQwIBHr
// SIG // B9VUlRVJlBtCkq6YXDAm2gBr6Hu97IkHD/cOBJjwicwf
// SIG // yzMkh53y9GccLPx754gd6udOo6HBI1PKjfpFzwnQXq/Q
// SIG // sEIEovmmbJNn1yjcRlOwhtDlKEYuJ6yGT1VSDOQDLPtq
// SIG // kJAwbofzWTCd+n7Wl7PoIZd++NIT8wi3U21StEWQn0gA
// SIG // SkdmEScpZqiX5NMGgUqi+YSnEUcUCYKfhO1VeP4Bmh1Q
// SIG // CIUAEDBG7bfeI0a7xC1Un68eeEExd8yb3zuDk6FhArUd
// SIG // DbH895uyAc4iS1T/+QXDwiALAgMBAAGjggGrMIIBpzAP
// SIG // BgNVHRMBAf8EBTADAQH/MB0GA1UdDgQWBBQjNPjZUkZw
// SIG // Cu1A+3b7syuwwzWzDzALBgNVHQ8EBAMCAYYwEAYJKwYB
// SIG // BAGCNxUBBAMCAQAwgZgGA1UdIwSBkDCBjYAUDqyCYEBW
// SIG // J5flJRP8KuEKU5VZ5KShY6RhMF8xEzARBgoJkiaJk/Is
// SIG // ZAEZFgNjb20xGTAXBgoJkiaJk/IsZAEZFgltaWNyb3Nv
// SIG // ZnQxLTArBgNVBAMTJE1pY3Jvc29mdCBSb290IENlcnRp
// SIG // ZmljYXRlIEF1dGhvcml0eYIQea0WoUqgpa1Mc1j0BxMu
// SIG // ZTBQBgNVHR8ESTBHMEWgQ6BBhj9odHRwOi8vY3JsLm1p
// SIG // Y3Jvc29mdC5jb20vcGtpL2NybC9wcm9kdWN0cy9taWNy
// SIG // b3NvZnRyb290Y2VydC5jcmwwVAYIKwYBBQUHAQEESDBG
// SIG // MEQGCCsGAQUFBzAChjhodHRwOi8vd3d3Lm1pY3Jvc29m
// SIG // dC5jb20vcGtpL2NlcnRzL01pY3Jvc29mdFJvb3RDZXJ0
// SIG // LmNydDATBgNVHSUEDDAKBggrBgEFBQcDCDANBgkqhkiG
// SIG // 9w0BAQUFAAOCAgEAEJeKw1wDRDbd6bStd9vOeVFNAbEu
// SIG // dHFbbQwTq86+e4+4LtQSooxtYrhXAstOIBNQmd16QOJX
// SIG // u69YmhzhHQGGrLt48ovQ7DsB7uK+jwoFyI1I4vBTFd1P
// SIG // q5Lk541q1YDB5pTyBi+FA+mRKiQicPv2/OR4mS4N9wfi
// SIG // cLwYTp2OawpylbihOZxnLcVRDupiXD8WmIsgP+IHGjL5
// SIG // zDFKdjE9K3ILyOpwPf+FChPfwgphjvDXuBfrTot/xTUr
// SIG // XqO/67x9C0J71FNyIe4wyrt4ZVxbARcKFA7S2hSY9Ty5
// SIG // ZlizLS/n+YWGzFFW6J1wlGysOUzU9nm/qhh6Yinvopsp
// SIG // NAZ3GmLJPR5tH4LwC8csu89Ds+X57H2146SodDW4TsVx
// SIG // IxImdgs8UoxxWkZDFLyzs7BNZ8ifQv+AeSGAnhUwZuhC
// SIG // El4ayJ4iIdBD6Svpu/RIzCzU2DKATCYqSCRfWupW76be
// SIG // mZ3KOm+9gSd0BhHudiG/m4LBJ1S2sWo9iaF2YbRuoROm
// SIG // v6pH8BJv/YoybLL+31HIjCPJZr2dHYcSZAI9La9Zj7jk
// SIG // IeW1sMpjtHhUBdRBLlCslLCleKuzoJZ1GtmShxN1Ii8y
// SIG // qAhuoFuMJb+g74TKIdbrHk/Jmu5J4PcBZW+JC33Iacjm
// SIG // buqnl84xKf8OxVtc2E0bodj6L54/LlUWa8kTo/0wggd6
// SIG // MIIFYqADAgECAgphDpDSAAAAAAADMA0GCSqGSIb3DQEB
// SIG // CwUAMIGIMQswCQYDVQQGEwJVUzETMBEGA1UECBMKV2Fz
// SIG // aGluZ3RvbjEQMA4GA1UEBxMHUmVkbW9uZDEeMBwGA1UE
// SIG // ChMVTWljcm9zb2Z0IENvcnBvcmF0aW9uMTIwMAYDVQQD
// SIG // EylNaWNyb3NvZnQgUm9vdCBDZXJ0aWZpY2F0ZSBBdXRo
// SIG // b3JpdHkgMjAxMTAeFw0xMTA3MDgyMDU5MDlaFw0yNjA3
// SIG // MDgyMTA5MDlaMH4xCzAJBgNVBAYTAlVTMRMwEQYDVQQI
// SIG // EwpXYXNoaW5ndG9uMRAwDgYDVQQHEwdSZWRtb25kMR4w
// SIG // HAYDVQQKExVNaWNyb3NvZnQgQ29ycG9yYXRpb24xKDAm
// SIG // BgNVBAMTH01pY3Jvc29mdCBDb2RlIFNpZ25pbmcgUENB
// SIG // IDIwMTEwggIiMA0GCSqGSIb3DQEBAQUAA4ICDwAwggIK
// SIG // AoICAQCr8PpyEBwurdhuqoIQTTS68rZYIZ9CGypr6VpQ
// SIG // qrgGOBoESbp/wwwe3TdrxhLYC/A4wpkGsMg51QEUMULT
// SIG // iQ15ZId+lGAkbK+eSZzpaF7S35tTsgosw6/ZqSuuegmv
// SIG // 15ZZymAaBelmdugyUiYSL+erCFDPs0S3XdjELgN1q2jz
// SIG // y23zOlyhFvRGuuA4ZKxuZDV4pqBjDy3TQJP4494HDdVc
// SIG // eaVJKecNvqATd76UPe/74ytaEB9NViiienLgEjq3SV7Y
// SIG // 7e1DkYPZe7J7hhvZPrGMXeiJT4Qa8qEvWeSQOy2uM1jF
// SIG // tz7+MtOzAz2xsq+SOH7SnYAs9U5WkSE1JcM5bmR/U7qc
// SIG // D60ZI4TL9LoDho33X/DQUr+MlIe8wCF0JV8YKLbMJyg4
// SIG // JZg5SjbPfLGSrhwjp6lm7GEfauEoSZ1fiOIlXdMhSz5S
// SIG // xLVXPyQD8NF6Wy/VI+NwXQ9RRnez+ADhvKwCgl/bwBWz
// SIG // vRvUVUvnOaEP6SNJvBi4RHxF5MHDcnrgcuck379GmcXv
// SIG // whxX24ON7E1JMKerjt/sW5+v/N2wZuLBl4F77dbtS+dJ
// SIG // KacTKKanfWeA5opieF+yL4TXV5xcv3coKPHtbcMojyyP
// SIG // QDdPweGFRInECUzF1KVDL3SV9274eCBYLBNdYJWaPk8z
// SIG // hNqwiBfenk70lrC8RqBsmNLg1oiMCwIDAQABo4IB7TCC
// SIG // AekwEAYJKwYBBAGCNxUBBAMCAQAwHQYDVR0OBBYEFEhu
// SIG // ZOVQBdOCqhc3NyK1bajKdQKVMBkGCSsGAQQBgjcUAgQM
// SIG // HgoAUwB1AGIAQwBBMAsGA1UdDwQEAwIBhjAPBgNVHRMB
// SIG // Af8EBTADAQH/MB8GA1UdIwQYMBaAFHItOgIxkEO5FAVO
// SIG // 4eqnxzHRI4k0MFoGA1UdHwRTMFEwT6BNoEuGSWh0dHA6
// SIG // Ly9jcmwubWljcm9zb2Z0LmNvbS9wa2kvY3JsL3Byb2R1
// SIG // Y3RzL01pY1Jvb0NlckF1dDIwMTFfMjAxMV8wM18yMi5j
// SIG // cmwwXgYIKwYBBQUHAQEEUjBQME4GCCsGAQUFBzAChkJo
// SIG // dHRwOi8vd3d3Lm1pY3Jvc29mdC5jb20vcGtpL2NlcnRz
// SIG // L01pY1Jvb0NlckF1dDIwMTFfMjAxMV8wM18yMi5jcnQw
// SIG // gZ8GA1UdIASBlzCBlDCBkQYJKwYBBAGCNy4DMIGDMD8G
// SIG // CCsGAQUFBwIBFjNodHRwOi8vd3d3Lm1pY3Jvc29mdC5j
// SIG // b20vcGtpb3BzL2RvY3MvcHJpbWFyeWNwcy5odG0wQAYI
// SIG // KwYBBQUHAgIwNB4yIB0ATABlAGcAYQBsAF8AcABvAGwA
// SIG // aQBjAHkAXwBzAHQAYQB0AGUAbQBlAG4AdAAuIB0wDQYJ
// SIG // KoZIhvcNAQELBQADggIBAGfyhqWY4FR5Gi7T2HRnIpsL
// SIG // lhHhY5KZQpZ90nkMkMFlXy4sPvjDctFtg/6+P+gKyju/
// SIG // R6mj82nbY78iNaWXXWWEkH2LRlBV2AySfNIaSxzzPEKL
// SIG // UtCw/WvjPgcuKZvmPRul1LUdd5Q54ulkyUQ9eHoj8xN9
// SIG // ppB0g430yyYCRirCihC7pKkFDJvtaPpoLpWgKj8qa1hJ
// SIG // Yx8JaW5amJbkg/TAj/NGK978O9C9Ne9uJa7lryft0N3z
// SIG // Dq+ZKJeYTQ49C/IIidYfwzIY4vDFLc5bnrRJOQrGCsLG
// SIG // ra7lstnbFYhRRVg4MnEnGn+x9Cf43iw6IGmYslmJaG5v
// SIG // p7d0w0AFBqYBKig+gj8TTWYLwLNN9eGPfxxvFX1Fp3bl
// SIG // QCplo8NdUmKGwx1jNpeG39rz+PIWoZon4c2ll9DuXWNB
// SIG // 41sHnIc+BncG0QaxdR8UvmFhtfDcxhsEvt9Bxw4o7t5l
// SIG // L+yX9qFcltgA1qFGvVnzl6UJS0gQmYAf0AApxbGbpT9F
// SIG // dx41xtKiop96eiL6SJUfq/tHI4D1nvi/a7dLl+LrdXga
// SIG // 7Oo3mXkYS//WsyNodeav+vyL6wuA6mk7r/ww7QRMjt/f
// SIG // dW1jkT3RnVZOT7+AVyKheBEyIXrvQQqxP/uozKRdwaGI
// SIG // m1dxVk5IRcBCyZt2WwqASGv9eZ/BvW1taslScxMNelDN
// SIG // MYIEjjCCBIoCAQEwgZUwfjELMAkGA1UEBhMCVVMxEzAR
// SIG // BgNVBAgTCldhc2hpbmd0b24xEDAOBgNVBAcTB1JlZG1v
// SIG // bmQxHjAcBgNVBAoTFU1pY3Jvc29mdCBDb3Jwb3JhdGlv
// SIG // bjEoMCYGA1UEAxMfTWljcm9zb2Z0IENvZGUgU2lnbmlu
// SIG // ZyBQQ0EgMjAxMQITMwAAAQNeJRyZH6MeuAAAAAABAzAJ
// SIG // BgUrDgMCGgUAoIGiMBkGCSqGSIb3DQEJAzEMBgorBgEE
// SIG // AYI3AgEEMBwGCisGAQQBgjcCAQsxDjAMBgorBgEEAYI3
// SIG // AgEVMCMGCSqGSIb3DQEJBDEWBBTAmEIwMfvSsDRLbCDj
// SIG // nEOAHL/dEDBCBgorBgEEAYI3AgEMMTQwMqAUgBIATQBp
// SIG // AGMAcgBvAHMAbwBmAHShGoAYaHR0cDovL3d3dy5taWNy
// SIG // b3NvZnQuY29tMA0GCSqGSIb3DQEBAQUABIIBAEdeptoc
// SIG // +evEi7yVQ1+ZQBMSXjH7MONB/zxUMH3VD0poAq+pTS2n
// SIG // 0Zdhc+xhhokBwU04bnpQixLZGeOaNT3TaQkL7ztRrNB+
// SIG // SabGlM+g3AnuCyoR4/1EFiry8srRVCsqchP/wbKkFhU5
// SIG // yw+cTLSUvdpVeRPD0WGEgA8kCx6Qf+BfIxE5UDIRMAdi
// SIG // ccTLVaeNJU7JEP+w1rRERjdawqICyd9GdZtUCdccNubx
// SIG // jcxFvthOtY8TLR6rNYEFvEYclyAQ3jSbNv85PMxvKfVH
// SIG // Wys4bvUZnlRacPOR3HjEJo34U2T/cv8Epslp6hg26XfG
// SIG // 7/oPblmgGeLv/f7YdDiA2cwVKqyhggIoMIICJAYJKoZI
// SIG // hvcNAQkGMYICFTCCAhECAQEwgY4wdzELMAkGA1UEBhMC
// SIG // VVMxEzARBgNVBAgTCldhc2hpbmd0b24xEDAOBgNVBAcT
// SIG // B1JlZG1vbmQxHjAcBgNVBAoTFU1pY3Jvc29mdCBDb3Jw
// SIG // b3JhdGlvbjEhMB8GA1UEAxMYTWljcm9zb2Z0IFRpbWUt
// SIG // U3RhbXAgUENBAhMzAAAA+VzJIlUKwJ3EAAAAAAD5MAkG
// SIG // BSsOAwIaBQCgXTAYBgkqhkiG9w0BCQMxCwYJKoZIhvcN
// SIG // AQcBMBwGCSqGSIb3DQEJBTEPFw0xODEwMTYwMzA4MjFa
// SIG // MCMGCSqGSIb3DQEJBDEWBBSG5Q9Fprq+edfuYV9MORLY
// SIG // 4j3XeTANBgkqhkiG9w0BAQUFAASCAQCmLIHZ4eEKuh31
// SIG // XJRcYInUfIcRIO7afev1F+bRsk56PThNqveg/A/NAkAy
// SIG // 7ks/e8me+Fibz876rGun+ctbi0NgRSVlZDMgATORPbZq
// SIG // ZC7GaN42nc8zpMprhvgcAjqdVRCZMmtMWaYwxufs7sYW
// SIG // 7vK1aJka701BmmtDv5J63Y0XBoCcD/LOygsKsWkt0cqL
// SIG // CG3lZNKq5ekPt+wbjm47FmLrDGqzzxfqU+FwKL2HH9kp
// SIG // qoXgvtp3PN/vNU+9PQmAVXZruJPUqOwT3wokj4WFuMw0
// SIG // qumitTo/unsiFIWdrWfEWgbreFLHxERn7O91ZWn6N58U
// SIG // XCceD8nKVF7lg8IySt5w
// SIG // End signature block
