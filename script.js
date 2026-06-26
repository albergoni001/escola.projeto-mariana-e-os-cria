// LINHA ATUALIZADA: Pega o ID de quem acabou de logar na tela de login
const alunoId = localStorage.getItem("aluno_logado") || "aluno_demonstracao";

document.addEventListener("DOMContentLoaded", async () => {
    const calendarGrid = document.getElementById("calendarGrid");
    const totalDays = 31;
    let savedDays = [];

    // 1. CARREGAR DO BANCO DE DADOS VIA PHP
    try {
        const response = await fetch(`salvar.php?aluno_id=${alunoId}`);
        const data = await response.json();
        if (data.status === "sucesso") {
            savedDays = data.dias;
        }
    } catch (error) {
        console.error("Erro ao carregar dados do PHP:", error);
    }

    // Gerador de dias do mês
    for (let i = 1; i <= totalDays; i++) {
        const dayElement = document.createElement("div");
        dayElement.classList.add("day");
        
        const dayString = i < 10 ? `0${i}` : `${i}`;
        dayElement.innerText = dayString;

        // Se o dia já veio marcado do banco MySQL, adiciona a cor verde
        if (savedDays.includes(dayString)) {
            dayElement.classList.add("checked");
        }

        // Clique para marcar/desmarcar o dia estudado
        dayElement.addEventListener("click", async () => {
            dayElement.classList.toggle("checked");
            
            // Atualiza a lista local baseada no clique
            if (dayElement.classList.contains("checked")) {
                if (!savedDays.includes(dayString)) savedDays.push(dayString);
            } else {
                savedDays = savedDays.filter(day => day !== dayString);
            }
            
            // 2. SALVAR NO BANCO DE DADOS VIA PHP (Envia em segundo plano)
            try {
                await fetch("salvar.php", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ aluno_id: alunoId, dias: savedDays })
                });
            } catch (error) {
                console.error("Erro ao salvar dados via PHP:", error);
            }

            updateStudentProgress();
        });

        calendarGrid.appendChild(dayElement);
    }

    // Inicializa a barra de progresso na tela
    updateStudentProgress();
});

// Mecânica de Acompanhamento de Desenvolvimento do Aluno
function updateStudentProgress() {
    const totalDays = 31;
    const checkedDays = document.querySelectorAll(".day.checked").length;
    
    const progressPercentage = Math.round((checkedDays / totalDays) * 100);
    
    const progressBar = document.getElementById("mainProgressBar");
    const progressStatus = document.getElementById("progressStatus");
    
    progressBar.style.width = `${progressPercentage}%`;
    progressStatus.innerText = `${progressPercentage}% das metas concluídas (${checkedDays} de ${totalDays} dias)`;
}

// Redirecionamento das formas de estudo
function openStudyMode(modeName) {
    if (modeName === 'Idiomas') {
        window.location.href = "idiomas.html";
    } else {
        alert(`O módulo de ${modeName} está sendo preparado!`);
    }
}
