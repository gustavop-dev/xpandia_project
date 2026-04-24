# Fake Data Management Commands

This directory contains Django commands to create and delete test data (fake data) in the database.

## 📋 Available Commands

### 1. Create Fake Users

```bash
python manage.py create_users [number_of_users]
```

**Example:**
```bash
python manage.py create_users 15
```

**Note:** Users are created with the default password: `password123`

---

### 2. Create All Fake Data at Once

```bash
python manage.py create_fake_data [number_of_records]
```

**Example with single number for all models:**
```bash
python manage.py create_fake_data 20
```

This will create 20 users.

**Example with specific numbers per model:**
```bash
python manage.py create_fake_data --users 10
```

---

### 3. Delete All Fake Data

```bash
python manage.py delete_fake_data --confirm
```

**⚠️ IMPORTANT:**
- This command requires the `--confirm` flag to prevent accidental deletions.
- **WILL NOT delete** administrator users or superusers (automatic protection).

---

## 🔒 Administrator User Protection

The `delete_fake_data` command is designed to **automatically protect** administrator users:

- ✅ **Keeps** users with `is_superuser=True`
- ✅ **Keeps** users with `is_staff=True`
- ❌ **Deletes** regular users

This ensures that system administration accounts are never accidentally deleted.

---

## 📊 Generated Data Structure

### User
- Unique email
- First and last name
- Phone number
- Role: Customer or Admin
- Default password: `password123`

---

## 🎯 Recommended Workflow

1. **Create all test data:**
   ```bash
   python manage.py create_fake_data 50
   ```

2. **Work with the application** using the test data.

3. **Clean the database when finished:**
   ```bash
   python manage.py delete_fake_data --confirm
   ```

4. **Recreate data if needed.**

---

## 💡 Tips

- Fake users have the password `password123` for easy testing.
- Check the Django admin panel to see all data organized by sections.
