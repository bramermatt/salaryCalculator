    const taxRate = 16.5;
    const insuranceRate = 18.7;
    const retirementRate = 3.0;
    const totalRate = taxRate + insuranceRate + retirementRate;

    function switchTab(tab) {
      document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.calculator').forEach(c => c.classList.add('hidden'));
      if (tab === 'grossToNet') {
        document.querySelector('.tab:nth-child(1)').classList.add('active');
        document.getElementById('grossToNetTab').classList.remove('hidden');
      } else {
        document.querySelector('.tab:nth-child(2)').classList.add('active');
        document.getElementById('netToGrossTab').classList.remove('hidden');
      }
    }

    function toggleSalaryInput() {
      const type = document.getElementById("salaryType").value;
      document.getElementById("hourlyInput").classList.toggle("hidden", type !== "hourly");
      document.getElementById("yearlyInput").classList.toggle("hidden", type !== "yearly");
    }

    function calculateNet() {
      const salaryType = document.getElementById("salaryType").value;
      const hourly = parseFloat(document.getElementById("hourly").value);
      const yearly = parseFloat(document.getElementById("yearly").value);
      let annualSalary;

      if (salaryType === "hourly") {
        if (isNaN(hourly)) return alert("Please enter a valid hourly rate.");
        annualSalary = hourly * 40 * 52;
      } else {
        if (isNaN(yearly)) return alert("Please enter a valid yearly salary.");
        annualSalary = yearly;
      }

      const biWeeklyGross = annualSalary / 26;
      const totalDeductions = biWeeklyGross * (totalRate / 100);
      const netPay = biWeeklyGross - totalDeductions;

      document.getElementById("netResult").innerHTML = `
        Gross: $${biWeeklyGross.toFixed(2)}<br>
        Estimated Deductions: $${totalDeductions.toFixed(2)}<br>
        <strong>Net Pay: $${netPay.toFixed(2)}</strong>
      `;
    }

    function calculateGross() {
      const netPay = parseFloat(document.getElementById("netPay").value);
      if (isNaN(netPay)) return alert("Please enter a valid net paycheck.");

      // Net = Gross * (1 - totalRate/100)
      const grossPay = netPay / (1 - (totalRate / 100));
      const deductions = grossPay - netPay;

      document.getElementById("grossResult").innerHTML = `
        Estimated Gross: $${grossPay.toFixed(2)}<br>
        Estimated Deductions: $${deductions.toFixed(2)}<br>
        <strong>Net Pay: $${netPay.toFixed(2)}</strong>
      `;
    }