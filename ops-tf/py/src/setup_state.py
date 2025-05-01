from .s3_bucket import S3Bucket
from .dynamodb_table import DynamoDBTable


class SetupTFState:
    def setup(self):
        print("Setting up state persistence ...")
        S3Bucket().setup()
        DynamoDBTable().setup()


if __name__ == "__main__":
    SetupTFState().setup()
