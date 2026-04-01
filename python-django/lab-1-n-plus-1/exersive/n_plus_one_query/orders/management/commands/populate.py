import random
from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from orders.models import Orders

User = get_user_model()

class Command(BaseCommand):
    help = 'Populate the User and Orders tables with sample data'

    def handle(self, *args, **kwargs):
        self.stdout.write('Populating data...')

        # Create 10 users
        users = []
        for i in range(1, 20):
            username = f'user{i}'
            email = f'user{i}@example.com'
            user, created = User.objects.get_or_create(username=username, email=email)
            if created:
                user.set_password('password123')
                user.save()
            users.append(user)
            
        self.stdout.write(f'Created/Found {len(users)} users.')

        # Create 50 orders
        orders_created = 0
        for i in range(1, 1000):
            customer = random.choice(users)
            order, created = Orders.objects.get_or_create(
                name=f'Order {i}',
                description=f'Description for randomly generated order {i}',
                customer=customer
            )
            if created:
                orders_created += 1

        self.stdout.write(self.style.SUCCESS(f'Successfully created {orders_created} new orders!'))
