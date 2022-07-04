import { Row, Col, Divider, Button, Select } from 'antd'
import classnames from 'classnames';
import './styles.scss'
import {CaretLeftOutlined,CaretRightOutlined } from '@ant-design/icons';
import { usePagination } from './custom-user-pagination';

const CustomPagination = (props) => {

    const {
        totalCount,
        pageSize,
        currentPage,
        className,
        onPageChange,
        onPageSizeChange
    } = props;

    const paginationRange = usePagination({
        currentPage,
        totalCount,
        pageSize
    });

    const onNext = () => {
        onPageChange(currentPage + 1);
      };
    
    const onPrevious = () => {
        onPageChange(currentPage - 1);
    };

    if (currentPage === 0) {
        return null;
    }
    let lastPage = paginationRange[paginationRange.length - 1]
    let firstPageIndex = (currentPage - 1) * 10 + 1
    let lastPageIndex = (currentPage, totalCount, pageSize) => {
        if(currentPage === Math.ceil(totalCount / pageSize)) return totalCount
        else return firstPageIndex + 9
    }
    return (
            <Row className={classnames('custom-pagination-container', { [className]: className })}>
                <Col span={4}>
                    <Row justify="center">
                        <span className="title-span-pagination">Items per page:</span>
                        <Select
                            optionFilterProp="children"
                            defaultValue={pageSize}
                            bordered = {false}
                            onChange={(value)=>{onPageSizeChange(value)}}
                            filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
                        >
                            <Select.Option value="10" key = "10">10</Select.Option>
                            <Select.Option value="20" key = "20">20</Select.Option>
                            <Select.Option value="50" key = "50">50</Select.Option>
                        </Select>
                    </Row>
                </Col>
                <Divider type="vertical" style={{height: "auto"}}/>

                <Col span={15}  className="title-span-pagination">
                    <span >{firstPageIndex}-{lastPageIndex(currentPage, totalCount, pageSize)} of {totalCount} items</span>

                </Col>
                <Divider type="vertical" style={{height: "auto"}}/>
                    

                <Col span={4}>
                    <Row justify='center'>
                        <Select
                            // showSearch
                            optionFilterProp="children"
                            defaultValue={1}
                            bordered = {false}
                            onChange={(value)=> onPageChange(value)}
                            filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
                        >
                            {[
                                ...Array.from(
                                {
                                    length: paginationRange.length,
                                },
                                (_, i) => i
                                ),
                            ].map((i) => (
                                <Select.Option
                                    className = {classnames('custom-pagiantion-items', {
                                                selected: i === currentPage
                                            })}
                                    key={`${i+1}`}
                                    value = {paginationRange[i]}
                                    title = {paginationRange[i]}
                                />
                            ))}
                        </Select>
                        <span className="title-span-pagination">{currentPage} of {lastPage} pages</span>
                        
                        <Button type="text" 
                            icon = {<CaretLeftOutlined />}
                            disabled= {currentPage === 1}
                            onClick={onPrevious}
                            />
                        <Button type="text" 
                            icon = {<CaretRightOutlined />}
                            onClick={onNext}
                            disabled={currentPage >= lastPage} 
                            />
                    </Row>
                </Col>
            </Row>
    )
}

export default CustomPagination