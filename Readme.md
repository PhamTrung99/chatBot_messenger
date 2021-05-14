# NOTE
1. SendApi là một Api cho phép mình thông qua đó để gửi message đến client.
2. Messenger Profile API là Api cho phép mình config các đối tượng mà muốn hiện lên khung chat, thí dụ như get_start hay persistent_menu. API này chỉ cần dùng postman để gửi đi là được, nó giống như kiểu setting khung chat thông qua việc gửi api.
3. sender_psid: Khi một client gửi tin đến một page, server facebook sẽ tự render một sender_psid để định danh người gửi tin, Cái này khá quan trọng, vì để biết ai gửi, và mình sẽ gửi lại cho ai.
4. Hàm getWebHook chỉ đơn giản để facebook định danh mình thôi(k cần hiểu).
5. Hàm postWebHook: Khi server facebook gọi đến endpoint /webhook của mình thì hàm này chạy,
mục đích để bắt sự kiện mà server facebook gửi qua rồi trả về lại.
- Trong hàm postWebHook sẽ gọi đến hàm HandleMessage(): Hàm này bắt các event là tin nhắn
- Trong hàm postWebHook sẽ gọi đến hàm HandlePostBack(): Hàm này bắt các event là các câu trả lời của người dùng, thông qua thuộc tính payload. Thí dụ: khi mình ấn SEARCH MOVIE thì nó sẽ hiểu đó là một event postBack.