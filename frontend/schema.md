## Skema Final yang Memenuhi Ketentuan:

### Tabel BOARDS (6 kolom + timestamps):

1. id - INTEGER (Primary Key)
2. title - STRING
3. description - TEXT
4. backgroundColor - STRING
5. isPrivate - BOOLEAN
6. ownerId - INTEGER (Foreign Key)
7. created_at, updated_at - TIMESTAMP (**kolom tanggal**)

### Tabel LISTS (7 kolom + timestamps):

1. id - INTEGER (Primary Key)
2. title - STRING
3. description - TEXT
4. position - INTEGER (**kolom angka**)
5. cardCount - INTEGER (**kolom angka**)
6. isArchived - BOOLEAN
7. boardId - INTEGER (Foreign Key)
8. created_at, updated_at - TIMESTAMP (**kolom tanggal**)

### Tabel CARDS (8 kolom + timestamps):

1. id - INTEGER (Primary Key)
2. title - STRING
3. description - TEXT
4. position - INTEGER (**kolom angka**)
5. dueDate - DATE (**kolom tanggal**)
6. isCompleted - BOOLEAN
7. listId - INTEGER (Foreign Key)
8. createdBy - INTEGER (Foreign Key)
9. created_at, updated_at - TIMESTAMP (**kolom tanggal**)
