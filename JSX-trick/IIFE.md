
1. In this code you can use once
```

if (true) {
  return <div>Hi</div>;
}
```

2. if you wanna use conditions in HTML codes:
```
{(() => {
  if (something) {
    return <div>Yes</div>;
  }
  return <div>No</div>;
})()}


```


Main Example:

```<Flex className={styles.booking_body_conntainer}>
  {(() => {
    const bookingItems =
      data.bookingDetails.length > 2
        ? data.bookingDetails.slice(0, 2)
        : data.bookingDetails;

    return (
      <>
        {bookingItems.map((item) => (
                <Text  key={item.bookingDetailId} fz={20} fw={500}>
                  {item?.staffFullName || 'No Name'}
                </Text>
        ))}

        {data.bookingDetails.length > 2 && (
          <Flex className={styles.booking_bodyCount}>
            <Text> +{data.bookingDetails.length - 2}</Text>
          </Flex>
        )}
      </>
    );
  })()}
</Flex>




```
