 const { day, month, year, ...rest } = data;

    const transformedData = {
      ...rest,
      userName: 'Shahin',
      userPass: '123',
      ...(day && month && year && { birthDate: new Date(`${day}-${month}-${year} 00:00:00`) }),
    };
