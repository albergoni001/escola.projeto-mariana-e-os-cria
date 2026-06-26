document.addEventListener("DOMContentLoaded", () => {
    const alunoId = localStorage.getItem("aluno_id") || "aluno_demonstracao";
    const calendarGrid = document.getElementById("calendarGrid");
    const nomeMesEl = document.getElementById("nomeMes");
    let savedDays = [];

    // CONTROLE DE MESES
    const meses = [
        "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
        "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ];
    let mesAtual = 5; // 0=Jan, 5=Junho
    let anoAtual = 2026;
    let diasNoMes = 30; // padrão, muda conforme mês/ano

    // ==============================================
    // 🔹 NAVEGAÇÃO ENTRE SEÇÕES (MENU LATERAL)
    // ==============================================
    const linksMenu = document.querySelectorAll(".sidebar-nav a");
    const secoes = document.querySelectorAll(".dashboard-section");
    const tituloPrincipal = document.getElementById("tituloPrincipal");
    const subtituloPrincipal = document.getElementById("subtituloPrincipal");

    linksMenu.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            // remove ativo de todos
            linksMenu.forEach(l => l.classList.remove("active"));
            secoes.forEach(s => s.classList.remove("active"));
            // adiciona ativo no clicado
            link.classList.add("active");
            const idSecao = link.dataset.section;
            document.getElementById(`sec-${idSecao}`).classList.add("active");

            // altera título da página
            switch(idSecao) {
                case "desenvolvimento":
                    tituloPrincipal.innerText = "Seu Desenvolvimento";
                    subtituloPrincipal.innerText = "Acompanhe sua evolução dia a dia";
                    break;
                case "painel":
                    tituloPrincipal.innerText = "Painel Geral";
                    subtituloPrincipal.innerText = "O caminho mais simples para aprender melhor!";
                    break;
                case "estatisticas":
                    tituloPrincipal.innerText = "Estatísticas";
                    subtituloPrincipal.innerText = "Dados completos do seu desempenho";
                    break;
                case "conquistas":
                    tituloPrincipal.innerText = "Conquistas";
                    subtituloPrincipal.innerText = "Marcos alcançados na sua jornada";
                    break;
                case "configuracoes":
                    tituloPrincipal.innerText = "Configurações";
                    subtituloPrincipal.innerText = "Ajustes e preferências do sistema";
                    break;
            }
        });
    });

    // ==============================================
    // 🔹 FUNÇÕES DE MÊS
    // ==============================================
    function atualizarNomeMes() {
        nomeMesEl.innerText = `${meses[mesAtual]}/${anoAtual} — Clique no dia em que você estudou para registrar seu progresso!`;
    }

    function definirDiasDoMes() {
        if ([0,2,4,6,7,9,11].includes(mesAtual)) diasNoMes = 31;
        else if ([3,5,8,10].includes(mesAtual)) diasNoMes = 30;
        else diasNoMes = (anoAtual %4===0) ? 29 : 28;
    }

    // ==============================================
    // 🔹 CARREGAR / SALVAR / LIMPAR
    // ==============================================
    async function loadDays() {
        try {
            const res = await fetch(`salvar.php?aluno_id=${alunoId}&mes=${mesAtual}&ano=${anoAtual}`);
            const data = await res.json();
            if (data.status === "sucesso") savedDays = data.dias || [];
        } catch(e) {
            console.error("Erro ao carregar",e);
        }
        renderCalendar();
        updateStudentProgress();
    }

    async function saveDaysToPHP() {
        try {
            await fetch("salvar.php", {
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body: JSON.stringify({
                    aluno_id: alunoId,
                    mes: mesAtual,
                    ano: anoAtual,
                    dias: savedDays
                })
            });
            alert("✅ Progresso salvo com sucesso!");
        } catch(e) {
            alert("❌ Erro ao salvar");
        }
    }

    function limparTudo() {
        if(confirm("Deseja apagar TODOS os registros desse mês?")) {
            savedDays = [];
            saveDaysToPHP();
            renderCalendar();
            updateStudentProgress();
        }
    }

    // ==============================================
    // 🔹 RENDER CALENDÁRIO
    // ==============================================
    function renderCalendar() {
        definirDiasDoMes();
        atualizarNomeMes();
        calendarGrid.innerHTML = "";

        for(let i=1; i<=diasNoMes; i++) {
            const el = document.createElement("div");
            el.className = "day";
            el.dataset.dia = i;
            el.innerText = i;

            if(savedDays.includes(i.toString())) el.classList.add("checked");

            el.addEventListener("click", () => {
                el.classList.toggle("checked");
                const diaStr = i.toString();
                savedDays = savedDays.includes(diaStr)
                    ? savedDays.filter(d=>d!==diaStr)
                    : [...savedDays, diaStr];
                updateStudentProgress();
            });

            calendarGrid.appendChild(el);
        }
    }

    // ==============================================
    // 🔹 BARRA DE PROGRESSO
    // ==============================================
    function updateStudentProgress() {
        const qtd = document.querySelectorAll(".day.checked").length;
        const total = diasNoMes;
        const porc = Math.round((qtd/total)*100) || 0;
        document.getElementById("progressBar").style.width = porc+"%";
        document.getElementById("progressStatus").innerText = `${porc}% das metas concluídas (${qtd} de ${total} dias)`;
    }

    // ==============================================
    // 🔹 BOTÕES DE AÇÃO
    // ==============================================
    document.getElementById("btnSalvar").addEventListener("click", saveDaysToPHP);
    document.getElementById("btnLimpar").addEventListener("click", limparTudo);

    document.getElementById("btnAnterior").addEventListener("click", () => {
        mesAtual--;
        if(mesAtual < 0) { mesAtual=11; anoAtual--; }
        loadDays();
    });

    document.getElementById("btnProximo").addEventListener("click", () => {
        mesAtual++;
        if(mesAtual > 11) { mesAtual=0; anoAtual++; }
        loadDays();
    });

    // ==============================================
    // 🔹 INICIAR
    // ==============================================
    loadDays();
});

